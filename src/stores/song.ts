import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Song as typeSong } from '../types/song';
import { getUser } from '../lib/auth';

// Define the initial state
type typeState = {
  id: number | null,
  data: typeSong | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
};

const initialState: typeState = {
  id: null,
  data: null,
  status: 'idle',
  error: null
};



// Define the thunk types
export const fetchSongFromId = createAsyncThunk<typeSong, string>(
  'song/fetchSong',
  async (currentId, { rejectWithValue }) => {
    try {
      console.log(currentId)
      const token = document.cookie?.split(';')?.map(i => i.trim())?.find(i => i.startsWith('token='))?.split('=')[1] as string || '';

      const user = await getUser();
      if (user.error) throw new Error('Something went wrong while fetching the user');
      if (!user.isLoggedIn) throw new Error('Please log in to continue');
      const { data } = await axios.get(
        `http://localhost:5000/video/info?id=${currentId}&token=${token}`, { headers: { "Authorization": "Bearer " + token } }
      );
      console.log(data.url)
      return data;
    } catch (err: any) {

      // If axios or the async function fails, it will be caught here
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchNextSong = createAsyncThunk<typeSong, string>(
  'song/fetchNext',
  async (currentId,{rejectWithValue}) => {
    try {
      const token = document.cookie?.split(';')?.map(i => i.trim())?.find(i => i.startsWith('token='))?.split('=')[1] as string || '';
      const user = await getUser();
      if (user.error) throw new Error('Something went wrong while fetching the user');
      if (!user.isLoggedIn) throw new Error('Please log in to continue');
      const response = await axios.get(`http://localhost:5000/video/next?id=${currentId}`, { headers: { "Authorization": "Bearer " + token } });
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response?.data?.message || err.message);

    }
  }
);

export const fetchPrevSong = createAsyncThunk<typeSong, number>(
  'song/fetchPrev',
  async (currentId) => {
    const response = await axios.get(`/songs/prev/${currentId}`);
    return response.data;
  }
);

// Create the slice
const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextSong.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNextSong.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchNextSong.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch next song';
      })
      .addCase(fetchPrevSong.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrevSong.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPrevSong.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch previous song';
      })
      .addCase(fetchSongFromId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongFromId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSongFromId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch song';
      });
  }
});

// Export the actions and reducer
export const { setId } = songSlice.actions;
export default songSlice.reducer;
