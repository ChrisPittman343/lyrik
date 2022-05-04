import { Song } from 'types/songTypes';

export const getRandom = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const selectLyrics = (lyrics: string[]): string[] => {
	const i = Math.floor(Math.random() * (lyrics.length - 3));
	const chosenLyrics: string[] = lyrics.slice(i, i + 3);
	return chosenLyrics;
};

export const getLyricsFor = async (song: Song): Promise<string[]> => {
	const lyricsRes = await fetch(`/api/lyrics?track_id=${song.id}`);
	if (lyricsRes.status === 200) {
		const { lyrics } = await lyricsRes.json();
		return lyrics;
	} else return null;
};
