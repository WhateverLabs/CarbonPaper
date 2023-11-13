<script lang="ts">
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import EyeSlashIcon from '$lib/icons/EyeSlashIcon.svelte';

	export let value: string;
	export let placeholder: string = '';
	export let style: string = '';
	export let id: string = '';
	export let label: string;
	export let secureText = false;
	export let disabled = false;

	let showSecureText = false;
</script>

<div class="container">
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

			&.secureText {
				display: flex !important;
				background-color: $backgroundColor;

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
					outline: none;
				}
			}
		}

		.label {
			margin-top: 0.5rem;
			font-size: 0.7rem;
		}
	}
</style>
