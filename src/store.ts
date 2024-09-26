import { configureStore } from '@reduxjs/toolkit'
// ...
import playListsSongsReducer from './stores/playListSongs'
import Song from './stores/song'
import playLists from './stores/playLists'
import PlayLists  from './stores/play-list-songs'
import DirectSongsSearch from './stores/direct-songs'
import SearchType from './stores/song-state'
import SongsHistory from  './stores/songs-history'
import User from './stores/user'
export const store = configureStore({
  reducer: {
  
    songs: playListsSongsReducer,
    song:Song,
    PlayLists:PlayLists,
    directSongsSearch:DirectSongsSearch,
    searchState: SearchType,
    songsHistory: SongsHistory,
    user:User
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch