import { RequestEvent } from '@sveltejs/kit/types/private';

export const get = async ({ request }: RequestEvent) => {
	try {
		const params = new URL(request.url).searchParams;
		if (!params.has('track_id'))
			return {
				status: 400,
				body: { error: 'No track_id was selected.' }
			};
		const track_id = params.get('track_id');

		// Call the MXM API to get the lyrics for the specified song
		const apikey = import.meta.env.VITE_MXM_ID;
		const apiUrl =
			'http://api.musixmatch.com/ws/1.1/track.lyrics.get?' +
			new URLSearchParams({
				apikey,
				track_id
			});

		const res = await fetch(apiUrl);
		const resJSON = await res.json();
		const lyricsBody: string = resJSON.message.body.lyrics.lyrics_body;
		const lyrics = lyricsBody
			.split(/\n/)
			.slice(0, -4)
			.filter((str) => str.length > 0);

		return {
			status: 200,
			body: {
				track_id,
				lyrics
			}
		};
	} catch (error) {
		console.log(error);

		return {
			status: 500,
			body: { error: `Something went wrong when fetching lyrics.` }
		};
	}
};
