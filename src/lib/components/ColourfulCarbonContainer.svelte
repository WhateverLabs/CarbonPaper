<div class="container">
	<slot />
</div>

<style lang="scss">
	$borderWidth: 12px;

	.container {
		background: black;
		background-clip: padding-box;
		border: $borderWidth solid transparent;
		position: relative;

		padding: 1rem;
		border-radius: 20px;
		box-shadow: 2px 2.5px 0.4px 1px rgba(0, 0, 0, 0.2);

		&::after {
			position: absolute;
			background: linear-gradient(0deg, #da3526, #4a26da);
			top: -$borderWidth;
			bottom: -$borderWidth;
			left: -$borderWidth;
			right: -$borderWidth;
			content: '';
			z-index: -1;
			border-radius: 15px;
		}
	}
</style>
