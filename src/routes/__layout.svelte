<script>
	import '../app.css';
</script>

<div class="max-h-screen max-w-screen">
	<div
		id="wrap"
		class="h-calc mt-16 pb-96 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
	>
		<slot />
	</div>
</div>

<style>
	.h-calc {
		height: calc(100vh - 4rem);
	}
</style>
