<script lang="ts">
	import CarbonButton from '$lib/components/CarbonButton.svelte';
	import CarbonInput from '$lib/components/CarbonInput.svelte';
	import CarbonSelect from '$lib/components/CarbonSelect.svelte';
	import CarbonTextarea from '$lib/components/CarbonTextarea.svelte';
	import CarbonToggle from '$lib/components/CarbonToggle.svelte';
	import { uint8ArrayToB64String } from '$lib/utils/encoding';

	import _sodium from 'libsodium-wrappers-sumo';

	let plainText = '';
	let senderName = '';
	let password = '';
	let oneView = false;
	let lifespan = '604800';

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

	const onShareHandler = () => {
		const key = generatePasteKey();

		const plainTextArray = te.encode(plainText);

		const payload = encryptPayload(key, plainTextArray);

		console.log(uint8ArrayToB64String(payload.header));
		console.log(uint8ArrayToB64String(payload.ciphertext));
	};
</script>

<div class="wrapper">
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
			<CarbonButton style="margin-top: 3rem;">Share</CarbonButton>
		</div>
	</form>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;

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
		}
	}
</style>
