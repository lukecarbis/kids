<script>
	export let cb;
	export let timeout;
	export let disabled;

	let pressTimer = null;

	const cancel = function () {
		if (pressTimer !== null) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}
	};

	const start = function (event) {
		if (event.type === 'click' && event.button !== 0) {
			return;
		}

		if (disabled) {
			return;
		}

		if (pressTimer === null) {
			pressTimer = setTimeout(() => {
				cb();
			}, timeout);
		}

		return false;
	};
</script>

<div
	on:mousedown={start}
	on:mouseout={cancel}
	on:blur={cancel}
	on:click={cancel}
	on:touchstart={start}
	on:touchend={cancel}
	on:touchleave={cancel}
	on:touchcancel={cancel}
	class:shake={pressTimer !== null}
>
	<slot />
</div>

<style>
	.shake {
		animation: shake 0.25s infinite;
	}

	@keyframes shake {
		0% {
			transform: rotate(-1deg);
		}
		50% {
			transform: rotate(-2deg);
		}
		100% {
			transform: rotate(-1deg);
		}
	}
</style>
