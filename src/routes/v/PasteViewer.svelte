<script lang="ts">
	import CarbonCopyButton from '$lib/components/CarbonCopyButton.svelte';
	import CarbonTextarea from '$lib/components/CarbonTextarea.svelte';
	import CarbonToggle from '$lib/components/CarbonToggle.svelte';
	import iframeMarkdownCSS from '$lib/styles/iframeMarkdownCSS';
	import { timeUntil } from '$lib/utils/time';

	export let senderName: string;
	export let body: string;
	export let expiresAt: string;

	import { Marked } from '@ts-stack/markdown';
	import { onMount } from 'svelte';

	let enableFormatting = true;

	let html = '';

	onMount(() => {
		const marked = Marked.setOptions({});

		html = marked.parse(body);
	});

	const iframeCSP = "default-src 'self'; style-src 'unsafe-inline';";
</script>

<h1>{senderName} shared a paste with you</h1>

{#if enableFormatting}
	<iframe
		class="text-body-sandbox"
		srcdoc={`
        <meta http-equiv="Content-Security-Policy" content="${iframeCSP}">
        ${html}<style>${iframeMarkdownCSS}</style>
        `}
		title="paste"
		frameborder="0"
	/>
{:else}
	<CarbonTextarea placeholder="" disabled value={body} style="width: 100%; height: 25rem" />
{/if}
<div class="view-options">
	{#if enableFormatting}
		<p class="disclaimer">Markdown is being rendered in a secure sandbox.</p>
	{/if}
	<CarbonToggle bind:checked={enableFormatting} label="Enable Formatting" />
</div>

<div class="paste-footer">
	<CarbonCopyButton text={body} />
	<p class="expiration">
		{#if expiresAt}
			This paste will be deleted in <span class="destruction-timer"
				>{timeUntil(new Date(expiresAt))}</span
			>.
		{/if}
	</p>
</div>

<style lang="scss">
	.text-body-sandbox {
		background-color: #35353d;
		border: none;
		box-sizing: border-box;
		color: white;
		resize: none;
		border-radius: 10px;
		height: 25rem;

		width: 100%;
	}

	.view-options {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 1rem 0;

		.disclaimer {
			margin-top: 0;
			font-size: 0.8rem;
			color: gray;
			text-align: right;
		}
	}

	.paste-footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-top: 1rem;

		.expiration {
			font-size: 0.8rem;
			color: gray;
			text-align: right;

			.destruction-timer {
				color: red;
			}
		}
	}
</style>
