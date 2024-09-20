import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Playlist, PlaylistState } from '../types/song';

// Initial state of the playlists
const initialState: PlaylistState = {
  playlists: [],
  loading: false,
  error: null,
};

// Async thunk to fetch playlists based on a search query
export const fetchPlaylists = createAsyncThunk<Playlist[], string>(
  'playlists/fetchPlaylists',
  async (searchQuery) => {
    const response = await axios.get(`http://localhost:5000/search/playlists?q=${searchQuery}`);
    return response.data;
  }
);

// Redux slice for playlists
const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<Playlist[]>) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch playlists';
      });
  },
});

export default playlistSlice.reducer;
