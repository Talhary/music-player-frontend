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
  
  export interface Song  {
    status: number;
    embed: {
        iframeUrl: string;
        width: number;
        height: number;
    };
    title: string;
    description: string;
    lengthSeconds: string;
    ownerProfileUrl: string;
    externalChannelId: string;
    isFamilySafe: boolean;
    availableCountries: string[];
    isUnlisted: boolean;
    hasYpcMetadata: boolean;
    viewCount: string;
    category: string;
    publishDate: string;
    ownerChannelName: string;
    uploadDate: string;
    isShortsEligible: boolean;
    videoId: string;
    keywords: string[];
    channelId: string;
    isOwnerViewing: boolean;
    isCrawlable: boolean;
    allowRatings: boolean;
    author: {
        id: string;
        name: string;
        user: string;
        channel_url: string;
        external_channel_url: string;
        user_url: string;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        verified: boolean;
        subscriber_count: number;
    };
    isPrivate: boolean;
    isUnpluggedCorpus: boolean;
    isLiveContent: boolean;
    media: Record<string, unknown>;
    likes: number;
    age_restricted: boolean;
    video_url: string;
    storyboards: {
        templateUrl: string;
        thumbnailWidth: number;
        thumbnailHeight: number;
        thumbnailCount: number;
        interval: number;
        columns: number;
        rows: number;
        storyboardCount: number;
    }[];
    chapters: unknown[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    url: string;
}
  export interface Artist {
    name: string;
    id: string;
  }
  
  // Define the structure of a song item
  export interface PlaylistSong {
    type: 'SONG' | 'VIDEO' | 'PLAYLIST';
    videoId?: string; // Present if type is 'SONG' or 'VIDEO'
    playlistId?: string; // Present if type is 'PLAYLIST'
    name: string;
    artist: {
      name: string;
      artistId: string;
    };
    album?: {
      name: string;
      albumId: string;
    }; // Only present if type is 'SONG'
    duration?: number; // Only present if type is 'SONG' or 'VIDEO'
    thumbnails: {
      url: string;
      width: number;
      height: number;
    }[];
  }
  
  // Sample array type
  
  
  // Define the structure of the state for playlist songs
  export interface PlaylistSongsState {
    songs: PlaylistSong[];
    loading: boolean;
    error: string | null;
  }