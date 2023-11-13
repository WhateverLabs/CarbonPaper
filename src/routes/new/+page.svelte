<script lang="ts">
	import PasteCreator from './PasteCreator.svelte';

	let pasteId = '';
	let pasteFragment = '';

	let page: 'creator' | 'share' = 'creator';
</script>

<div class="wrapper">
	{#if page === 'creator'}
		<PasteCreator />
	{:else}{/if}
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
	}
</style>
