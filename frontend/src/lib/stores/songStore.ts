import { selectLyrics } from '$lib/util/selectLyric';
import { writable } from 'svelte/store';
import { Song } from 'types/songTypes';

export const songs = writable<Song[]>();

export const currentSong = writable<Song>();

export const chosenLyrics = writable<string[]>();

currentSong.subscribe((val) => {
	chosenLyrics.set(val?.lyrics ? selectLyrics(val.lyrics) : null);
});
