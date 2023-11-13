<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import PasteViewer from './PasteViewer.svelte';
	import type { PasteRequestBody } from '$lib/types/pasteCreation';
	import { preparePassword } from '$lib/utils/pw';
	import _sodium from 'libsodium-wrappers-sumo';
	import { onMount } from 'svelte';
	import PasswordRequestView from './PasswordRequestView.svelte';

	const pasteId = $page.params.id;

	let password = '';
	let requestPassword = false;

	let metadata: {
		passwordHashSalt: string;
	} | null = null;

	let senderName = '';
	let body = '';

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

		try {
			metadata = await getPasteMetadata();
		} catch (err) {
			console.error(err);
			alert('Failed to load paste metadata');
			return;
		}

		if (!requestPassword && metadata.passwordHashSalt.length > 0) {
			requestPassword = true;
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
			alert('Failed to load paste data');
			return;
		}

		let decryptionKey: Uint8Array;

		// fetch decryption key from fragment
		const fragment = window.location.hash.substring(1);

		if (kek) {
			const ciphertext = fragment.replace('pw--', '');

			const decryptedKeyUint8Array = decryptCiphertext(kek, data.encryptedKeyHeader!, ciphertext);

			decryptionKey = decryptedKeyUint8Array;
		} else {
			decryptionKey = _sodium.from_base64(fragment);
		}

		// decrypt sender name and body
		const decryptedSenderName = decryptCiphertext(
			decryptionKey,
			data.senderNameHeader!,
			data.senderNameCiphertext!
		);

		const decryptedBody = decryptCiphertext(decryptionKey, data.bodyHeader!, data.bodyCiphertext!);

		senderName = td.decode(decryptedSenderName);
		body = td.decode(decryptedBody);

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
		{#if requestPassword}
			<PasswordRequestView bind:password onSubmit={loadPaste} />
		{:else}
			<PasteViewer {senderName} {body} />
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

		.container {
			max-width: 600px;
			text-align: center;
			color: white;
			width: 100%;
		}
	}
</style>
