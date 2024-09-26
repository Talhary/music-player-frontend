// Define the structure of the playlist item
export interface Playlist {
    playlistId: string;
    title: string;
    totalSongs: number;
    thumbnailUrl: string;
  }
  
  // Define the structure of the state
  export interface PlaylistState {
    playlists: Playlist[];
    loading: boolean;
    error: string | null;
  }
  
  export type Song = {
    youtubeId: string;
    title: string;
    artists: {
      name: string;
      id: string;
    }[];
    album: string;
    thumbnailUrl: string;
    duration: {
      label: string;
      totalSeconds: number;
    };
    isExplicit: boolean;
    url:string;
  };
  export interface Artist {
    name: string;
    id: string;
  }
  
  // Define the structure of a song item
  export interface PlaylistSong {
    youtubeId: string;
    title: string;
    artists: Artist[];
    album: string;
    thumbnailUrl: string;
    isExplicit: boolean;
  }
  
  // Define the structure of the state for playlist songs
  export interface PlaylistSongsState {
    songs: PlaylistSong[];
    loading: boolean;
    error: string | null;
  }