import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PlaylistSong, PlaylistSongsState } from '../types/song';

// Initial state for playlist songs
const initialState: PlaylistSongsState = {
  songs: [],
  loading: false,
  error: null,
};

// Async thunk to fetch playlist songs based on a playlist ID
export const fetchDirectSongs = createAsyncThunk<PlaylistSong[], string>(
  'songs/fetchSongs',
  async (text) => {
    const response = await axios.get(`http://localhost:5000/search/musics?q=${text}`);
    return response.data;
  }
);

// Redux slice for playlist songs
const playlistSongsSlice = createSlice({
  name: 'directSongs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectSongs.fulfilled, (state, action: PayloadAction<PlaylistSong[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchDirectSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch playlist songs';
      });
  },
});

export default playlistSongsSlice.reducer;
