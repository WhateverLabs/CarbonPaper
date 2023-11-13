<script lang="ts">
	export let click: () => void = () => {};
	export let style = '';
</script>

<button {style} class="button" on:click type="submit"><slot /></button>

<style lang="scss">
	.button {
		background-color: #6721af;
		color: white;
		border-radius: 10px;
		border: none;
		padding: 0.5rem 1rem;
		font-size: 1.1rem;

		&:hover {
			cursor: pointer;
			background-color: #812fd2;
		}

		&:active {
			background-color: #531790;
		}
	}
</style>
