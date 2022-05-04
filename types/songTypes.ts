export interface Song {
  id: number;
  name: string;
  artist: string;
  lyrics: string[];
  album?: string;
}

export interface LyricsResponse {
  track_id: number;
  lyrics: string[];
}
