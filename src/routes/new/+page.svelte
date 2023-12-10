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

<svelte:head>
	<title>Carbon Paper - Create Secure Pastes</title>
	<meta
		name="description"
		content="Carbon Paper encrypts your pastes with XChaCha20-Poly1305, a battle-tested algorithm that keeps your secrets safe. All of this is done on the client-side, ensuring that no one but you and the receivers of the share link can view the paste's contents."
	/>
	<meta property="og:image" content="/carbon-paper-mobile.webp" />
</svelte:head>

<div class="wrapper">
	<div class="container">
		<div class="logo-container">
			<Logo />
		</div>
		{#if page === 'creator'}
			<PasteCreator bind:pasteId bind:pasteFragment />
		{:else}
			<ShareView {pasteId} {pasteFragment} />
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		min-height: 100%;
		padding: 1rem;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;

		background: linear-gradient(180deg, black, #310a52);

		.logo-container {
			margin-bottom: 1rem;
		}

		.container {
			max-width: 600px;
			text-align: center;
			color: white;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
