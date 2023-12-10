<script lang="ts">
	export let forId: string;
	export let label: string;
</script>

<label class="label" for={forId}>{label}</label>

<style lang="scss">
	.label {
		margin-top: 0.5rem;
		font-size: 0.7rem;

		@media only screen and (max-width: 768px) {
			margin-top: 0;
			text-align: left;
		}
	}
</style>
