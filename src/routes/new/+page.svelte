<script lang="ts">
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
	<div class="container">
		{#if page === 'creator'}
			<PasteCreator bind:pasteId bind:pasteFragment />
		{:else}
			<ShareView {pasteId} {pasteFragment} />
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

		background: linear-gradient(180deg, black, #310a52);

		.container {
			max-width: 600px;
			text-align: center;
			color: white;
			width: 100%;
		}
	}
</style>
