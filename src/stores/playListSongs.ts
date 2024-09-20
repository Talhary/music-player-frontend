import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';
import type {Song} from '../types/song'
// Define the type for the slice state
type SongsState = {
  songs: Song[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Define the initial state
const initialState: SongsState = {
  songs: [],
  status: 'idle',
  error: null,
};

// Create an async thunk for fetching songs
export const fetchSongs = createAsyncThunk<Song[], string >(
  'songs/fetchSongs',
  async (playlistId) => {
    return [{
        id: "1",    
        name: "song 1",
        artist: "Queen",
        imageUrl: "/placeholder.svg?height=40&width=40",
        duration: "5:55",
        url:'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg'
      },{
        id: "2",
        name: "song 2",
        artist: "Queen",
        imageUrl: "/placeholder.svg?height=40&width=40",
        duration: "5:55",
        url:'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'

      }
,{
    id: "3",
    name: "song 3",
    artist: "Queen",
    imageUrl: "/placeholder.svg?height=40&width=40",
    duration: "5:55",
    url:'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'

  }
,{
    id: "4",
    name: "song 4",
    artist: "Queen",
    imageUrl: "/placeholder.svg?height=40&width=40",
    duration: "5:55",
    url:'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'

  }

]
  }
);

// Create the slice
const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.status = 'succeeded';
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch songs';
      });
  },
});

export const selectSongs = (state: RootState) => state.songs.songs;
export const selectSongsStatus = (state: RootState) => state.songs.status;
export const selectSongsError = (state: RootState) => state.songs.error;


export default songsSlice.reducer;
