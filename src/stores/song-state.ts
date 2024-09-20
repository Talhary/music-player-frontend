import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type stateType = {
  search: string;
  type: "Song" | "Playlists";
};

const initialState: stateType = {
  search: "",
  type: "Song",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    updateType(state, action: PayloadAction<"Song" | "Playlists">) {
      state.type = action.payload;
    },
  },
});

export const { updateSearch, updateType } = searchSlice.actions;

export default searchSlice.reducer;