<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import CarbonButton from '$lib/components/CarbonButton.svelte';
	import CarbonInput from '$lib/components/CarbonInput.svelte';
	import CarbonSelect from '$lib/components/CarbonSelect.svelte';
	import CarbonTextarea from '$lib/components/CarbonTextarea.svelte';
	import CarbonToggle from '$lib/components/CarbonToggle.svelte';
	import type { PasteRequestBody } from '$lib/types/pasteCreation';
	import { uint8ArrayToB64String } from '$lib/utils/encoding';

	import _sodium from 'libsodium-wrappers-sumo';

	export let pasteId: string = '';
	export let pasteFragment: string = '';

	let plainText = '';
	let senderName = '';
	let password = '';
	let oneView = false;
	let lifespan = '604800';

	let shareLoading = false;

	const generatePasteKey = () => {
		const key = _sodium.randombytes_buf(_sodium.crypto_aead_chacha20poly1305_KEYBYTES);
		return key;
	};

	const encryptPayload = (key: Uint8Array, data: ArrayBuffer) => {
		const state = _sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

		const ciphertext = _sodium.crypto_secretstream_xchacha20poly1305_push(
			state.state,
			new Uint8Array(data),
			null,
			_sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL
		);

		return {
			header: state.header,
			ciphertext
		};
	};

	const preparePassword = () => {
		// create a salt
		const salt = _sodium.randombytes_buf(_sodium.crypto_pwhash_SALTBYTES);

		// derive a key from the password
		const key = _sodium.crypto_pwhash(
			_sodium.crypto_pwhash_SALTBYTES,
			password,
			salt,
			_sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
			_sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
			_sodium.crypto_pwhash_ALG_ARGON2ID13
		);

		return {
			salt,
			key
		};
	};

	const te = new TextEncoder();

	const onShareHandler = async () => {
		shareLoading = true;

		const key = generatePasteKey();

		const plainTextArray = te.encode(plainText);

		const senderNamePlaintext = senderName || 'Anonymous';
		const senderNameArray = te.encode(senderNamePlaintext);
		const senderNameEncrypted = encryptPayload(key, senderNameArray);

		const bodyEncrypted = encryptPayload(key, plainTextArray);

		const requestBody = {
			senderNameHeader: uint8ArrayToB64String(senderNameEncrypted.header),
			senderNameCiphertext: uint8ArrayToB64String(senderNameEncrypted.ciphertext),

			bodyHeader: uint8ArrayToB64String(bodyEncrypted.header),
			bodyCiphertext: uint8ArrayToB64String(bodyEncrypted.ciphertext),

			expiresInSeconds: Number(lifespan)
		} as PasteRequestBody;

		if (password.length > 0) {
			const pwHash = preparePassword();
			const salt = pwHash.salt;
			const keyEncryptionKey = pwHash.key;

			requestBody.passwordHashSalt = uint8ArrayToB64String(salt);
			const kekHash = _sodium.crypto_generichash(
				_sodium.crypto_generichash_KEYBYTES,
				keyEncryptionKey
			);
			requestBody.passwordHash = uint8ArrayToB64String(kekHash);
			// encrypt the key
			const keyEncrypted = encryptPayload(keyEncryptionKey, key);

			requestBody.encryptedKeyHeader = uint8ArrayToB64String(keyEncrypted.header);
			pasteFragment = `pw--${uint8ArrayToB64String(keyEncrypted.ciphertext)}`;
		} else {
			pasteFragment = uint8ArrayToB64String(key);
		}

		let res: Response;

		try {
			res = await fetch(`${PUBLIC_API_URL}/new`, {
				method: 'post',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});
		} catch (e) {
			alert(e);
			return;
		} finally {
			shareLoading = false;
		}

		const data: {
			success: boolean;
			message: string;
			data: string;
		} = await res.json();

		if (!data.success) {
			alert(data.message);
			return;
		}

		pasteId = data.data;
	};
</script>

<form style="display: contents" on:submit|preventDefault={onShareHandler}>
	<div class="container">
		<div class="textarea">
			<CarbonTextarea
				placeholder="May your paste be long; May your copy be swift..."
				bind:value={plainText}
				style="width: 100%; height: 25rem;"
				required
			/>
		</div>
		<div class="options">
			<CarbonInput
				id="sender-name-field"
				bind:value={senderName}
				label="Sender Name (optional)"
				placeholder="Darth Vader"
			/>
			<CarbonInput
				id="password-field"
				bind:value={password}
				label="Password (optional)"
				placeholder="••••••••"
				secureText
			/>
			<CarbonToggle id="one-view-toggle" label="One View" bind:checked={oneView} />
			<CarbonSelect
				id="lifespan-select"
				label="Lifespan"
				bind:selected={lifespan}
				options={[
					{
						label: '1 Hour',
						value: '3600'
					},
					{
						label: '6 Hours',
						value: '21600'
					},
					{
						label: '1 Day',
						value: '86400'
					},
					{
						label: '3 Days',
						value: '259200'
					},
					{
						label: '1 Week',
						value: '604800'
					}
				]}
			/>
		</div>
		<div class="call-to-action">
			<CarbonButton style="margin-top: 3rem;" loading={shareLoading}>Share</CarbonButton>
		</div>
	</div>
</form>

<style lang="scss">
	.container {
		max-width: 600px;
		text-align: center;
		color: white;
		width: 100%;

		.options {
			margin-top: 1.5rem;
			display: flex;
			justify-content: space-between;
			gap: 1rem;

			@media only screen and (max-width: 768px) {
				flex-direction: column;
				align-items: flex-start;
			}
		}

		.call-to-action {
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}
</style>
