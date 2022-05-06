<script lang="ts">
	import { currentSong } from '$lib/stores/songStore';
	import ScreenFade from './popup/ScreenFade.svelte';

	export let isCorrect: boolean;
	export let revealed: boolean;
</script>

<ScreenFade showing={revealed}>
	<div class="flex w-full max-w-md flex-col gap-y-8 rounded bg-black p-8 text-xl shadow">
		<h1 class="text-center text-3xl">
			{isCorrect ? '🎉 Correct! 🎉' : 'Incorrect.'}
		</h1>
		<h2 class="text-center">
			The song was
			<b>
				{$currentSong.name}
			</b>
			by
			<b> {$currentSong.artist}</b>
		</h2>
	</div>
</ScreenFade>

<style lang="postcss">
	b {
		@apply font-semibold;
	}
</style>
