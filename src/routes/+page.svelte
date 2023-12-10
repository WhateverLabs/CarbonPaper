<script>
	import CarbonButton from '$lib/components/CarbonButton.svelte';
	import ColourfulCarbonContainer from '$lib/components/ColourfulCarbonContainer.svelte';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="wrapper">
	<div class="container">
		<div class="hero">
			<Logo />
			<h1>Invisible Ink for the Digital Age</h1>
			<ColourfulCarbonContainer>
				<p style="margin: 0; text-align: left; font-size: 1.2rem">
					Carbon Paper encrypts your pastes with XSalsa20-Poly1305, a battle-tested algorithm that
					keeps your secrets safe.
					<br />
					<br />
					All of this is done on the client-side, ensuring that no one but you and the receivers of the
					share link can view the paste's contents.
				</p>
			</ColourfulCarbonContainer>
		</div>

		<div class="simplicity">
			<h1>Simplicity is Key</h1>
			<p>Just paste, copy the link, and share it with whoever.</p>
			<a href="/new" style="display: contents">
				<CarbonButton>Start</CarbonButton>
			</a>
		</div>
		<p class="credit">
			Engineered by <a href="https://httpjames.space" target="_blank">http.james</a>
		</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
		background: linear-gradient(0deg, black, #310a52);

		.container {
			max-width: 600px;
			text-align: center;
			color: white;
			width: 100%;

			.hero {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.simplicity {
				margin-top: 5rem;
				display: flex;
				flex-direction: column;
				align-items: center;

				h1 {
					margin-bottom: 0;
				}
			}

			.credit {
				font-size: 0.75rem;
			}
		}
	}
</style>
