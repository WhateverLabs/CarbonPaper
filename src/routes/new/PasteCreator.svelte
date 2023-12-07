<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import CarbonButton from '$lib/components/CarbonButton.svelte';
	import CarbonInput from '$lib/components/CarbonInput.svelte';
	import CarbonSelect from '$lib/components/CarbonSelect.svelte';
	import CarbonTextarea from '$lib/components/CarbonTextarea.svelte';
	import CarbonToggle from '$lib/components/CarbonToggle.svelte';
	import type { PasteRequestBody } from '$lib/types/pasteCreation';
	import { preparePassword } from '$lib/utils/pw';

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

	const te = new TextEncoder();

	const onShareHandler = async () => {
		await _sodium.ready;

		shareLoading = true;

		const key = generatePasteKey();

		const plainTextArray = te.encode(plainText);

		const senderNamePlaintext = senderName || 'Anonymous';
		const senderNameArray = te.encode(senderNamePlaintext);
		const senderNameEncrypted = encryptPayload(key, senderNameArray);

		const bodyEncrypted = encryptPayload(key, plainTextArray);

		const requestBody = {
			senderNameHeader: _sodium.to_base64(senderNameEncrypted.header),
			senderNameCiphertext: _sodium.to_base64(senderNameEncrypted.ciphertext),

			bodyHeader: _sodium.to_base64(bodyEncrypted.header),
			bodyCiphertext: _sodium.to_base64(bodyEncrypted.ciphertext),

			oneView,

			expiresInSeconds: Number(lifespan)
		} as PasteRequestBody;

		if (password.length > 0) {
			if (password.length < _sodium.crypto_pwhash_PASSWD_MIN) {
				alert('Password too short');
				return;
			}

			const pwHash = preparePassword(password);
			const salt = pwHash.salt;
			const keyEncryptionKey = pwHash.key;

			requestBody.passwordHashSalt = _sodium.to_base64(salt);
			const kekHash = _sodium.crypto_generichash(
				_sodium.crypto_generichash_KEYBYTES,
				keyEncryptionKey
			);
			requestBody.kekHash = _sodium.to_base64(kekHash);
			// encrypt the key
			const keyEncrypted = encryptPayload(keyEncryptionKey, key);

			requestBody.encryptedKeyHeader = _sodium.to_base64(keyEncrypted.header);
			pasteFragment = `pw--${_sodium.to_base64(keyEncrypted.ciphertext)}`;
		} else {
			pasteFragment = _sodium.to_base64(key);
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
	<CarbonTextarea
		placeholder="May your paste be long; May your copy be swift..."
		bind:value={plainText}
		style="width: 100%; height: 25rem;"
		required
	/>
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
	<p style="font-size: 0.8rem;">
		Your sender name and content will be end-to-end encrypted during upload.
	</p>
	<div class="call-to-action">
		<CarbonButton style="margin-top: 3rem;" loading={shareLoading}>Share</CarbonButton>
	</div>
</form>

<style lang="scss">
	.options {
		margin-top: 1.5rem;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;

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
</style>
