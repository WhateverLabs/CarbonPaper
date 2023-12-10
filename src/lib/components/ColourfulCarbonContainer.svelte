<div class="container">
	<div class="child">
		<slot />
	</div>
</div>

<style lang="scss">
	.container {
		background: linear-gradient(0deg, #da3526, #4a26da);
		position: relative;

		padding: 0.5rem;
		border-radius: 20px;
		box-shadow: 2px 2.5px 0.4px 1px rgba(0, 0, 0, 0.2);

		.child {
			width: 100%;
			height: 100%;
			background-color: black;
			border-radius: 10px;
			padding: 1rem;
			box-sizing: border-box;
		}
	}
</style>
