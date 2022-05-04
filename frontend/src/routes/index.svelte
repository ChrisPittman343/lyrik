<script lang="ts">
	import { goto } from '$app/navigation';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import Guess from '$lib/components/Guess.svelte';
	import Lyrics from '$lib/components/Lyrics.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import { chosenLyrics, currentSong, songs } from '$lib/stores/songStore';
	import { getLyricsFor, getRandom } from '$lib/util/selectLyric';
	import { onMount } from 'svelte';
	import { Icon } from 'svelte-awesome';
	import random from 'svelte-awesome/icons/random';

	let revealed = false;
	let isCorrect = false;

	onMount(async () => {
		// Fetch and store popular songs, if not done already. Redirect on fail
		if (!$songs) {
			const songListRes = await fetch('/api/songList');
			if (songListRes.status === 200) songs.set(await songListRes.json());
			else {
				await goto('/error');
				return;
			}
		}

		// Randomly select the first song
		currentSong.set(getRandom($songs));

		// Fetch and set lyrics for the current song. Redirect on fail
		await setLyricsForCurrent();
	});

	/**
	 * Fetch and set the lyrics for the current song. Redirect on fail.
	 * Will automatically choose lyrics when the song is updated.
	 */
	const setLyricsForCurrent = async () => {
		const lyrics = await getLyricsFor($currentSong);
		if (lyrics && lyrics.length > 0)
			currentSong.update((val) => {
				return {
					...val,
					lyrics
				};
			});
		else {
			await goto('/error');
			return;
		}
	};

	const onReveal = (correct: boolean) => {
		isCorrect = correct;
		revealed = true;
	};

	const onRandomize = async () => {
		if (!$currentSong) return;
		chosenLyrics.set(null);
		currentSong.set(getRandom($songs));
		await setLyricsForCurrent();
	};
</script>

{#if $currentSong && $chosenLyrics}
	<div class="flex flex-col items-center justify-center gap-y-8 text-center">
		<Lyrics />
		<Guess {onReveal} />
		<Reveal {isCorrect} bind:revealed />
		<SecondaryButton on:click={onRandomize}>
			<Icon data={random} class="h-9 w-9 p-2" />
		</SecondaryButton>
	</div>
{/if}
