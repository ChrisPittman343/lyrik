<script lang="ts">
	import { chosenLyrics, currentSong } from '$lib/stores/songStore';
	import SecondaryButton from './buttons/SecondaryButton.svelte';

	let linesShown = 1;
	let showArtist = false;
	let showAlbum = false;
</script>

<div class="flex flex-col gap-y-4 text-left">
	{#each $chosenLyrics as lyric, lyricIx}
		<div
			class={`text-3xl transition-opacity duration-1000 ${
				linesShown > lyricIx ? 'opacity-100' : 'opacity-0'
			}`}
		>
			{lyric}
		</div>
	{/each}
</div>
<div class="flex gap-8 text-lg">
	{#if showArtist}
		<div>Artist: {$currentSong.artist}</div>
	{/if}
	{#if showAlbum}
		<div>Album: {$currentSong.album}</div>
	{/if}
</div>
<div class="flex items-center justify-center gap-x-4">
	{#if linesShown < $chosenLyrics.length}
		<SecondaryButton on:click={() => linesShown++}>Next Line</SecondaryButton>
	{/if}
	{#if !showArtist}
		<SecondaryButton on:click={() => (showArtist = true)}>Artist</SecondaryButton>
	{/if}
	{#if !showAlbum}
		<SecondaryButton on:click={() => (showAlbum = true)}>Album</SecondaryButton>
	{/if}
</div>
