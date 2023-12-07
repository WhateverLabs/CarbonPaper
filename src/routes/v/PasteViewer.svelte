<script lang="ts">
	import CarbonCopyButton from '$lib/components/CarbonCopyButton.svelte';
	import CarbonTextarea from '$lib/components/CarbonTextarea.svelte';

	export let senderName: string;
	export let body: string;
</script>

<h1>{senderName} shared a paste with you</h1>
<CarbonTextarea placeholder="" disabled value={body} style="width: 100%; height: 25rem" />

<div style="display: flex; justify-content: center; width: 100%; margin-top: 1rem;">
	<CarbonCopyButton text={body} />
</div>
