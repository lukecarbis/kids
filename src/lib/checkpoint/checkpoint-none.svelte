<script>
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import { init } from 'emoji-mart';
	init({ data });
</script>

<div class="checkpoint mt-6 mb-2 text-center z-0 snap-always snap-start scroll-mt-6">
	<p class="bg-white text-sky-500 font-bold text-xl py-2">It's your day off!</p>
	<p class="my-6">
		<em-emoji set="twitter" size="32px" native="🏖️" />
	</p>
	<p class="bg-white py-2">There are no tasks for you today.</p>
	<p class="bg-white py-2">Check back again tomorrow.</p>
</div>
