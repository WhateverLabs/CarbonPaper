<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import PasteViewer from './PasteViewer.svelte';
	import type { PasteRequestBody } from '$lib/types/pasteCreation';
	import { preparePassword } from '$lib/utils/pw';
	import _sodium from 'libsodium-wrappers-sumo';
	import { onMount } from 'svelte';
	import PasswordRequestView from './PasswordRequestView.svelte';
	import LoaderIcon from '$lib/icons/LoaderIcon.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Logo from '$lib/components/Logo.svelte';

	const pasteId = $page.url.searchParams.get('id');
	let password = '';
	let requestPassword = false;

	let metadata: {
		passwordHashSalt: string;
	} | null = null;

	let senderName = '';
	let body = '';
	let expiresAt = '';
	let oneView = false;

	let loading = true;

	let showError = false;
	let errorMessage = '';

	const getPasteMetadata = async () => {
		let res: Response;

		try {
			res = await fetch(`${PUBLIC_API_URL}/metadata/${pasteId}`);
		} catch (err) {
			throw err;
		}

		const data: {
			success: boolean;
			message: string;
			data: {
				passwordHashSalt: string;
			};
		} = await res.json();

		if (!data.success) {
			throw new Error(data.message);
		}

		return data.data;
	};

	const getPasteData = async (kekHash?: string) => {
		let url = `${PUBLIC_API_URL}/data/${pasteId}`;

		if (kekHash) {
			url += `?passwordHash=${kekHash}`;
		}

		let res: Response;

		try {
			res = await fetch(url);
		} catch (err) {
			throw err;
		}

		const data: {
			success: boolean;
			message: string;
			data: PasteRequestBody;
		} = await res.json();

		if (!data.success) {
			throw new Error(data.message);
		}

		return data.data;
	};

	const td = new TextDecoder();

	const loadPaste = async () => {
		await _sodium.ready;

		loading = true;

		try {
			metadata = await getPasteMetadata();
		} catch (err) {
			showError = true;
			errorMessage = "This paste doesn't exist.";
			loading = false;
			return;
		}

		if (!requestPassword && metadata.passwordHashSalt.length > 0) {
			requestPassword = true;
			loading = false;
			return;
		}

		let kek: Uint8Array | undefined;
		let kekHash: string | undefined;

		if (metadata.passwordHashSalt.length > 0) {
			const pw = preparePassword(password, metadata?.passwordHashSalt);

			// hash the password
			kekHash = _sodium.to_base64(
				_sodium.crypto_generichash(_sodium.crypto_generichash_KEYBYTES, pw.key)
			);
			kek = pw.key;
		}

		let data;
		try {
			data = await getPasteData(kekHash);
		} catch (err) {
			console.error(err);
			errorMessage = "This paste doesn't exist.";
			loading = false;
			return;
		}

		expiresAt = data.expiresAt;
		oneView = data.oneView;

		let decryptionKey: Uint8Array;

		// fetch decryption key from fragment
		const fragment = window.location.hash.substring(1);

		if (kek) {
			const ciphertext = fragment.replace('pw--', '');

			let decryptedKeyUint8Array: Uint8Array;

			try {
				decryptedKeyUint8Array = decryptCiphertext(kek, data.encryptedKeyHeader!, ciphertext);
			} catch {
				showError = true;
				errorMessage = 'Failed to decrypt paste.';
				loading = false;
				return;
			}

			decryptionKey = decryptedKeyUint8Array;
		} else {
			decryptionKey = _sodium.from_base64(fragment);
		}

		// decrypt sender name and body
		let decryptedSenderName: Uint8Array;

		try {
			decryptedSenderName = decryptCiphertext(
				decryptionKey,
				data.senderNameHeader!,
				data.senderNameCiphertext!
			);
		} catch {
			showError = true;
			errorMessage = 'Failed to decrypt paste.';
			loading = false;
			return;
		}

		let decryptedBody: Uint8Array;

		try {
			decryptedBody = decryptCiphertext(decryptionKey, data.bodyHeader!, data.bodyCiphertext!);
		} catch {
			showError = true;
			errorMessage = 'Failed to decrypt paste.';
			loading = false;
			return;
		}

		senderName = td.decode(decryptedSenderName);
		body = td.decode(decryptedBody);

		loading = false;

		requestPassword = false;
	};

	const decryptCiphertext = (key: Uint8Array, headerB64: string, ciphertextB64: string) => {
		const headerUint8Array = _sodium.from_base64(headerB64);
		const state = _sodium.crypto_secretstream_xchacha20poly1305_init_pull(headerUint8Array, key);

		const ciphertextUint8Array = _sodium.from_base64(ciphertextB64);

		const decryptedUint8Array = _sodium.crypto_secretstream_xchacha20poly1305_pull(
			state,
			ciphertextUint8Array
		);

		return decryptedUint8Array.message;
	};

	onMount(() => {
		loadPaste();
	});
</script>

<div class="wrapper">
	<div class="container">
		<div class="logo-container">
			<Logo />
		</div>
		{#if loading}
			<LoaderIcon width={30} height={30} />
		{:else if showError && errorMessage}
			<Alert type="error" title="Failed to load paste" message={errorMessage} />
		{:else}
			<!-- svelte-ignore -->
			{#if requestPassword}
				<PasswordRequestView bind:password onSubmit={loadPaste} />
			{:else}
				<PasteViewer {senderName} {body} {expiresAt} {oneView} />
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;

		background: black;
		background-image: url('/receiver_circles.svg');
		background-repeat: no-repeat;
		background-position: top center;
		background-size: cover;

		.container {
			max-width: 600px;
			text-align: center;
			color: white;
			width: 100%;

			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
