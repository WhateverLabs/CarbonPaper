<script lang="ts">
	export let options: Array<{ value: string; label: string }>;
	export let selected: string;
	export let style: string = '';
	export let id: string = '';
	export let label: string;
</script>

<div class="container">
	<div class="group">
		<select bind:value={selected} {style} {id} class="input">
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
	<label class="label" for={id}>{label}</label>
</div>

<style lang="scss">
	$backgroundColor: #35353d;

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		.group {
			display: contents;
			border-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			background-color: $backgroundColor;
		}

		.input {
			background-color: inherit;
			border: none;
			padding: 0.5rem;
			box-sizing: border-box;
			color: white;
			border-top-left-radius: inherit;
			border-bottom-left-radius: inherit;
			border-top-right-radius: inherit;
			border-bottom-right-radius: inherit;

			&:hover {
				background-color: #4a4a53;
				cursor: pointer;
			}
		}

		.label {
			margin-top: 0.5rem;
			font-size: 0.7rem;
		}
	}
</style>
