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
export const fetchPlaylistSongs = createAsyncThunk<PlaylistSong[], string>(
  'playlistSongs/fetchPlaylistSongs',
  async (playlistId) => {
    const response = await axios.get(`http://localhost:5000/playlist/songs?playlistId=${playlistId}`);
    return response.data;
  }
);

// Redux slice for playlist songs
const playlistSongsSlice = createSlice({
  name: 'playlistSongs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistSongs.fulfilled, (state, action: PayloadAction<PlaylistSong[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchPlaylistSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch playlist songs';
      });
  },
});

export default playlistSongsSlice.reducer;
