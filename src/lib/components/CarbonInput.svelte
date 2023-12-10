<script lang="ts">
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import EyeSlashIcon from '$lib/icons/EyeSlashIcon.svelte';
	import CarbonInputLabel from './CarbonInputLabel.svelte';

	export let value: string;
	export let placeholder: string = '';
	export let style: string = '';
	export let id: string = '';
	export let label: string;
	export let secureText = false;
	export let disabled = false;

	let showSecureText = false;
</script>

<div class="container" {style}>
	<div class="group" class:secureText>
		{#if (secureText && showSecureText) || !secureText}
			<input
				class="input"
				bind:value
				{placeholder}
				{style}
				{id}
				type="text"
				class:clear={!secureText}
				{disabled}
			/>
		{:else}
			<input class="input" bind:value {placeholder} {style} {id} type="password" {disabled} />
		{/if}
		{#if secureText}
			<button
				class="eye"
				type="button"
				aria-label="Toggle password visibility"
				on:click={() => (showSecureText = !showSecureText)}
				{disabled}
			>
				{#if !showSecureText}
					<EyeIcon />
				{:else}
					<EyeSlashIcon />
				{/if}
			</button>
		{/if}
	</div>
	<CarbonInputLabel forId={id} {label} />
</div>

<style lang="scss">
	$backgroundColor: #35353d;

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

		.group {
			display: contents;
			border-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			background-color: $backgroundColor;

			@media only screen and (max-width: 768px) {
				background-color: gray;
			}

			&.secureText {
				display: flex !important;
				background-color: $backgroundColor;

				@media only screen and (max-width: 768px) {
					background-color: gray;
				}

				.eye {
					background-color: inherit;
					border: none;

					fill: white;
					color: white;

					border-top-right-radius: inherit;
					border-bottom-right-radius: inherit;

					display: flex;
					justify-content: center;
					align-items: center;

					&:hover {
						background-color: #4a4a53;
						cursor: pointer;
					}

					&:active {
						background-color: #27272d;
					}

					@media only screen and (max-width: 768px) {
						background-color: gray;
						width: 2.5rem;
						font-size: 1rem;
					}
				}
			}

			.input {
				background-color: inherit;
				border: none;
				padding: 0.5rem;
				box-sizing: border-box;
				color: white;
				border-top-left-radius: inherit;
				border-bottom-left-radius: inherit;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;

				@media only screen and (max-width: 768px) {
					height: 2.5rem;
					padding: 1rem;
				}

				&.clear {
					border-top-right-radius: inherit;
					border-bottom-right-radius: inherit;
				}

				&:hover {
					// only show if not focused
					&:not(:focus, :disabled) {
						background-color: #4a4a53;
						cursor: pointer;
					}
				}

				&:focus {
					box-shadow: 0 0 20px #701ab6;
				}
			}
		}
	}
</style>
