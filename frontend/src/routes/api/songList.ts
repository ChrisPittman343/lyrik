import { RequestEvent } from '@sveltejs/kit/types/private';
import type { Song } from 'types/songTypes';

export const get = async ({}: RequestEvent) => {
	try {
		const apikey = import.meta.env.VITE_MXM_ID;
		const apiUrl =
			'https://api.musixmatch.com/ws/1.1/chart.tracks.get?' +
			new URLSearchParams({
				apikey,
				chart_name: 'hot',
				page_size: '50',
				page: '1',
				f_has_lyrics: '1'
			});

		const res = await fetch(apiUrl);
		if (res.status !== 200) throw new Error();

		const resJSON = await res.json();
		const songList: Song[] = resJSON.message.body.track_list
			.map(({ track }) => {
				return {
					id: track.track_id,
					name: track.track_name,
					artist: track.artist_name,
					album: track.album_name
				};
			})
			.filter((song: Song) => song.name.length < 32);

		return {
			status: 200,
			body: songList
		};
	} catch (error) {
		console.log(error);

		return {
			status: 500,
			body: { error: 'Something went wrong when fetching popular songs.' }
		};
	}
};
