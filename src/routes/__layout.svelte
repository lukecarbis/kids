<script>
	import '../app.css';

	// Init emojis.
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import { init } from 'emoji-mart';
	init({ data });
</script>

<div class="absolute h-full w-full">
	<slot />
</div>
