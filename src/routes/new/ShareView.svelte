<script lang="ts">
	import CarbonButton from '$lib/components/CarbonButton.svelte';
	import CarbonCopyButton from '$lib/components/CarbonCopyButton.svelte';
	import CarbonInput from '$lib/components/CarbonInput.svelte';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	export let pasteId: string;
	export let pasteFragment: string;

	const url = `${window.location.protocol}//${window.location.host}/v?id=${pasteId}#${pasteFragment}`;

	let qrDataURL = '';

	const generateQRCode = async () => {
		qrDataURL = await QRCode.toDataURL(url);
	};

	onMount(() => {
		generateQRCode();
	});
</script>

<h1>Paste uploaded securely</h1>

<CarbonInput
	id="paste-url-input"
	value={url}
	label="Paste Share URL"
	style="width: 100%;"
	disabled
/>

<div class="center" style="margin-top: 2rem">
	<CarbonCopyButton text={url} />
	{#if navigator.canShare && navigator.canShare()}
		<CarbonButton
			on:click={() => {
				navigator.share({
					url
				});
			}}>Share</CarbonButton
		>
	{/if}
</div>

<div class="qrcode">
	<img src={qrDataURL} alt="qrcode" />
</div>

<div class="center">
	<CarbonButton
		style="margin-top: 2rem"
		on:click={() => {
			window.location.href = '/new';
		}}>Create Another</CarbonButton
	>
</div>

<style lang="scss">
	.qrcode {
		margin-top: 2rem;
	}

	.center {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
