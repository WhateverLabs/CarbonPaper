<script lang="ts">
	import CarbonInputLabel from './CarbonInputLabel.svelte';

	export let checked = false;
	export let id: string = '';
	export let label: string;
</script>

<div class="container">
	<label class="switch">
		<input type="checkbox" bind:checked {id} />
		<span class="slider" />
	</label>

	<CarbonInputLabel forId={id} {label} />
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		@media only screen and (max-width: 768px) {
			width: 100%;
			background-color: #35353d;
			flex-direction: row-reverse;
			justify-content: space-between;
			padding: 0.5rem 1rem;
			box-sizing: border-box;
			border-radius: 10px;
			align-items: center;
		}
	}

	.label {
		margin-top: 0.5rem;
		font-size: 0.7rem;

		@media only screen and (max-width: 768px) {
			margin-top: 0;
			font-size: 1rem;
		}
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #35353d;
		transition: 0.4s;
		border-radius: 20px;

		@media only screen and (max-width: 768px) {
			background-color: gray;
		}

		&.slider:before {
			position: absolute;
			content: '';
			height: 26px;
			width: 26px;
			left: 4px;
			bottom: 4px;
			background-color: white;
			transition: 0.4s;
			border-radius: 20px;
		}
	}

	input:checked + .slider {
		background-color: #701ab6;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #701ab6;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}

	// if the checkbox is focused, focus the slider
	input:focus + .slider {
		box-shadow: 0 0 20px #701ab6;
	}
</style>
