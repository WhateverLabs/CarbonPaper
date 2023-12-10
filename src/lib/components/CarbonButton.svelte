<script lang="ts">
	import LoaderIcon from '$lib/icons/LoaderIcon.svelte';

	export let style = '';
	export let loading = false;
</script>

<button {style} class="button" on:click type="submit" disabled={loading}>
	{#if loading}
		<LoaderIcon />
	{/if}
	<slot />
</button>

<style lang="scss">
	.button {
		background-color: #6721af;
		color: white;
		border-radius: 10px;
		border: none;
		padding: 0.5rem 1rem;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);

		&:hover {
			cursor: pointer;
			background-color: #812fd2;
		}

		&:active {
			background-color: #531790;
		}

		&:disabled {
			cursor: not-allowed;

			color: #9b9b9b;

			background-color: #531790;

			&:hover {
				background-color: #531790;
			}

			&:active {
				background-color: #531790;
			}
		}
	}
</style>
