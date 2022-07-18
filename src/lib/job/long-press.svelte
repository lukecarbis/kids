<script>
	export let cb;
	let pressTimer;

	const cancel = function (event) {
		if (pressTimer !== null) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}

		const container = event.target.closest('div');
		container.classList.remove('-rotate-1');
	};

	const start = function (event) {
		if (event.type === 'click' && event.button !== 0) {
			return;
		}

		const container = event.target.closest('div');
		container.classList.add('-rotate-1');

		if (pressTimer === null) {
			pressTimer = setTimeout(() => {
				cb();
				container.classList.remove('-rotate-1');
			}, 1500);
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
>
	<slot />
</div>
