<script lang="ts">
	import { onMount } from 'svelte';
	import PrimaryButton from './buttons/PrimaryButton.svelte';
	import ScreenFade from './popup/ScreenFade.svelte';

	let showing = false;

	onMount(() => {
		// Show the hero the first time the user visits
		// If visited before, don't show
		if (document.cookie.length > 0) return;

		// Add a long lasting cookie to mark visitation, and display hero
		document.cookie = 'showHero=0;max-age=31536000';
		showing = true;
	});
</script>

<ScreenFade {showing}>
	<div class="max-w-2xl rounded bg-black p-8">
		<div class="flex flex-nowrap items-center justify-center gap-8">
			<img src="/banner_left.svg" alt="" class="hidden aspect-auto h-20 lg:block" />
			<h1 class="w-full text-center text-4xl font-semibold lg:w-auto">Welcome to Lyrik!</h1>
			<img src="/banner_right.svg" alt="" class="hidden aspect-auto h-20 lg:block" />
		</div>
		<p class="py-8 text-xl leading-relaxed">
			Lyrik is a lyric guessing game for popular songs, according to the <a
				href="https://www.musixmatch.com/explore">top Musixmatch songs</a
			>. Lyrics are also fetched thanks to the Musixmatch API.
			<br />
			<br />
			If you are stuck on a song, there are a number of hints available to assist you. You can view 2
			more lines of lyrics, the artist, and the album.
		</p>
		<div class="flex justify-end">
			<PrimaryButton on:click={() => (showing = false)}>Start Playing</PrimaryButton>
		</div>
	</div>
</ScreenFade>

<style lang="postcss">
</style>
