<script lang="ts">
	import PasteCreator from '$lib/pages/PasteCreator.svelte';

	let pasteId = '';
	let pasteFragment = '';
</script>

<div class="wrapper">
	<PasteCreator />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>
