<script lang="ts">
	import CarbonButton from '$lib/components/CarbonButton.svelte';
	import CarbonInput from '$lib/components/CarbonInput.svelte';

	export let password: string;
	export let onSubmit: () => void;
</script>

<h1>Enter the paste's password</h1>

<form on:submit|preventDefault={onSubmit} class="password-form">
	<CarbonInput id="password-input" label="Password" bind:value={password} secureText={true} />
	<div class="decrypt-container">
		<CarbonButton>Decrypt</CarbonButton>
	</div>
</form>

<style lang="scss">
	.password-form {
		display: contents;
	}

	.decrypt-container {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 1rem;
	}
</style>
