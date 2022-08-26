<script>
	import { onValue, ref } from 'firebase/database';
	import { db } from '$lib/firebase.js';

	let connected = false;

	onValue(ref(db, '.info/connected'), (snapshot) => {
		connected = snapshot.val();
	});
</script>

{#if !connected}
	<span class="flex items-center h-8 px-3 rounded-lg z-50 bg-white border">
		<span class="inline-block w-2 h-2 rounded-full border-2 border-amber-400" />
		<p class="text-sm leading-4 text-slate-600 -mt-px relative top-px pl-2">Disconnected</p>
	</span>
{/if}
