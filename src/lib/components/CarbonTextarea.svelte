<script lang="ts">
	export let value: string;
	export let placeholder: string;
	export let style: string = '';
	export let required = false;
	export let disabled = false;
</script>

<textarea class="textarea" bind:value {placeholder} {style} {required} {disabled} />

<style lang="scss">
	.textarea {
		background-color: #35353d;
		border: none;
		padding: 1rem;
		box-sizing: border-box;
		color: white;
		resize: none;
		border-radius: 10px;

		&:hover {
			// only show if not focused
			&:not(:focus, :disabled) {
				background-color: #4a4a53;
				cursor: pointer;
			}
		}

		&:focus {
			outline: none;
		}
	}
</style>
