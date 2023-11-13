<script lang="ts">
	import CarbonTextarea from '$lib/components/CarbonTextarea.svelte';

	export let senderName: string;
	export let body: string;
</script>

<h1>{senderName} shared a paste with you</h1>
<CarbonTextarea placeholder="" disabled value={body} style="width: 100%; max-height: 25rem;" />
