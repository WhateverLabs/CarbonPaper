<script lang="ts">
	import CarbonButton from '$lib/components/CarbonButton.svelte';
	import CarbonInput from '$lib/components/CarbonInput.svelte';
	import CarbonSelect from '$lib/components/CarbonSelect.svelte';
	import CarbonTextarea from '$lib/components/CarbonTextarea.svelte';
	import CarbonToggle from '$lib/components/CarbonToggle.svelte';

	let plainText = '';
	let senderName = '';
	let password = '';
	let oneView = false;
	let lifespan = '604800';
</script>

<div class="wrapper">
	<form style="display: contents">
		<div class="container">
			<div class="textarea">
				<CarbonTextarea
					placeholder="May your paste be long; May your copy be swift..."
					bind:value={plainText}
					style="width: 100%; height: 25rem;"
					required
				/>
			</div>
			<div class="options">
				<CarbonInput
					id="sender-name-field"
					bind:value={senderName}
					label="Sender Name (optional)"
					placeholder="Darth Vader"
				/>
				<CarbonInput
					id="password-field"
					bind:value={password}
					label="Password (optional)"
					placeholder="••••••••"
					secureText
				/>
				<CarbonToggle id="one-view-toggle" label="One View" bind:checked={oneView} />
				<CarbonSelect
					id="lifespan-select"
					label="Lifespan"
					bind:selected={lifespan}
					options={[
						{
							label: '1 Hour',
							value: '3600'
						},
						{
							label: '6 Hours',
							value: '21600'
						},
						{
							label: '1 Day',
							value: '86400'
						},
						{
							label: '3 Days',
							value: '259200'
						},
						{
							label: '1 Week',
							value: '604800'
						}
					]}
				/>
			</div>
			<CarbonButton style="margin-top: 3rem;">Share</CarbonButton>
		</div>
	</form>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;

		.container {
			max-width: 600px;
			text-align: center;
			color: white;
			width: 100%;

			.options {
				margin-top: 1.5rem;
				display: flex;
				justify-content: space-between;
				gap: 1rem;

				@media only screen and (max-width: 768px) {
					flex-direction: column;
					align-items: flex-start;
				}
			}
		}
	}
</style>
