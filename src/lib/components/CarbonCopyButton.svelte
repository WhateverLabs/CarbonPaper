<script lang="ts">
	import { copyText } from 'svelte-copy';

	import CarbonButton from './CarbonButton.svelte';

	let buttonText = 'Copy';

	export let text: string;
</script>

<CarbonButton
	on:click={() => {
		copyText(text);

		buttonText = 'Copied ✔︎';

		// revert after 2 seconds
		setTimeout(() => {
			buttonText = 'Copy';
		}, 2000);
	}}>{buttonText}</CarbonButton
>
