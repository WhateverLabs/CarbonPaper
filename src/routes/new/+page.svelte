<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import PasteCreator from './PasteCreator.svelte';
	import ShareView from './ShareView.svelte';

	let pasteId = '';
	let pasteFragment = '';

	let page: 'creator' | 'share' = 'creator';

	$: {
		if (pasteId && pasteFragment) {
			page = 'share';
		}
	}
</script>

<div class="wrapper">
	<div class="logo-container">
		<Logo />
	</div>
	<div class="parent">
		<div class="container">
			{#if page === 'creator'}
				<PasteCreator bind:pasteId bind:pasteFragment />
			{:else}
				<ShareView {pasteId} {pasteFragment} />
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		min-height: 100%;
		padding: 1rem;
		box-sizing: border-box;

		background: linear-gradient(180deg, black, #310a52);

		.logo-container {
			margin-bottom: 1rem;
		}

		.parent {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 100%;
			height: 100%;

			.container {
				max-width: 600px;
				text-align: center;
				color: white;
				width: 100%;
			}
		}
	}
</style>
