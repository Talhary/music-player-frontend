'use client'

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { fetchPlaylists } from "../stores/playLists"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { fetchDirectSongs } from "../stores/direct-songs"
import {updateSearch, updateType } from '../stores/song-state'
export function MusicSearch() {
  const {search,type} = useSelector((state:RootState)=>state.searchState)
  
  const dispatch: AppDispatch = useDispatch();
    const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if(type == 'Playlists'){
      dispatch(fetchPlaylists(search));
    }else{
      dispatch(fetchDirectSongs(search))
    }
    
    // Here you would typically call an API to perform the search
  }

  return (
    <div className="w-full max-w-2xl  mx-auto p-4">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 ">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder={`Search ${search.toLowerCase()}...`}
            value={search}
            onChange={(e) => dispatch(updateSearch(e.target.value))}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
        
        <Button type="submit">Search</Button>
      </form>

      
    </div>
  )
}