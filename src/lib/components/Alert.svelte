<script lang="ts">
	export let title: string;
	export let message: string;
	export let type: 'success' | 'error';
	export let style = '';
</script>

<div class="alert" class:error={type === 'error'} {style}>
	<h3>{title}</h3>
	<p>{message}</p>
</div>

<style lang="scss">
	.alert {
		padding: 1rem;
		box-sizing: border-box;
		border-radius: 15px;

		&.error {
			background-color: rgba(255, 0, 0, 0.319);
			border: 1px solid red;
		}

		h3,
		p {
			margin: 0;
		}

		text-align: left;
	}
</style>
