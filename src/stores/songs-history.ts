// src/store/itemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../types/song';

interface ItemState {
  items: Song[];
}

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: 'songsHistory',
  initialState,
  reducers: {
    addItemToSearchHistory(state, action: PayloadAction<Song>) {
      state.items.push(action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItemToSearchHistory, clearItems } = itemSlice.actions;

export default itemSlice.reducer;
