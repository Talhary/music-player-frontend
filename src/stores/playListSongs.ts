import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async () => {
     return null
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
