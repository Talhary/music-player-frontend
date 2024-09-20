import {
  fetchSongs,
  selectSongs,
  selectSongsError,
  selectSongsStatus,
} from "../stores/playListSongs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "../components/ui/toast";
import type { Song as SongType } from "../types/song";

import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Slider } from "../components/ui/slider";
import {
  Home,
  Search,
  Library,
  ChevronLeft,
  ChevronRight,
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Loader2,
} from "lucide-react";
import { fetchSongFromId } from "../stores/song";
import AudioPlayer from "../lib/player";
import { fetchPlaylists } from "../stores/playLists";
import { PlaylistSongsComponent } from "./songs-list";
import { fetchPlaylistSongs } from "../stores/play-list-songs";
import { Input } from "../components/ui/input";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { MusicSearch } from "./music-search";
import { DirectSongs } from "./directSongs";
import SongsHistoryList from "../components/music-history-list";
import { HistoryDropdown } from "./history-dropdown";
import { HeaderComponent } from "./header";
import { useNavigate } from "react-router";
import { updateUser } from "../stores/user";
export function MusicPlayerFrontPage() {
  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();
  const songs: SongType[] = useSelector((state: RootState) =>
    selectSongs(state)
  );
  const status = useSelector((state: RootState) => selectSongsStatus(state));
  const errorOfSelectSongs = useSelector((state: RootState) =>
    selectSongsError(state)
  );
  const { playlists, loading, error } = useSelector(
    (state: RootState) => state.playlists
  );
  const { search, type } = useSelector((state: RootState) => state.searchState);
  const tracks = useSelector(
    (state: RootState) => state.directSongsSearch.songs
  ); // Corrected to match the slice name

  const [splaylists, setPlayLists] = useState(playlists);
  useEffect(() => {
    setPlayLists(playlists);
  }, [playlists]);
  useEffect(() => {
    if (status === "idle") {
    }
  }, []);
  useEffect(()=>{
   const token = document.cookie?.split(';')?.map(i => i.trim())?.find(i => i.startsWith('token='))?.split('=')[1] as string || '';

    const authenticate = async (token:string) => {
      try {
        const response = await fetch(`http://localhost:5000/auth/user`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data?.user?.email) {
          dispatch(updateUser(data.user));
        } 
      } catch (error) {
        console.log(error);
      }
    };
    if(token)authenticate(token)
  },[])
  if (status === "failed")
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "ERROR",
              description: { error },
              action: <ToastAction altText="Error">Undo</ToastAction>,
            });
          }}
        ></Button>
      </div>
    );
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex max-md:flex-col flex-1 overflow-hidden">
        <nav className="w-fit  mx-auto bg-card p-4">
          <HistoryDropdown />
        </nav>
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <HeaderComponent/>
            <div className="px-3  py-1    space-y-2 ">
              <div className="grid grid-cols-3 gap-4">
                {type == "Playlists" &&
                  splaylists.map((playlist) => (
                    <Button
                      key={playlist.playlistId}
                      variant="secondary"
                      className="h-16 justify-start space-x-4"
                      onClick={() => {
                        dispatch(fetchPlaylistSongs(playlist.playlistId));
                      }}
                    >
                      <img
                        src={playlist.thumbnailUrl}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{playlist.title}</span>
                    </Button>
                  ))}
              </div>
              {status=='loading'? 
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-16 w-16 animate-spin" />
                </div>
              
              : <div  className=" ">
                {tracks.length == 0 ? (
                  <h2 className="text-2xl font-semibold">
                    Please Search Song{" "}
                  </h2>
                ) : (
                  <h2 className="text-2xl py-3 font-semibold">Songs</h2>
                )}

                {type == "Playlists" && <PlaylistSongsComponent />}
                {type == "Song" && <DirectSongs />}
              </div>}
            </div>
          </ScrollArea>
        </main>
      </div>
      <footer className="border-t bg-card p-4 hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted relative rounded-md overflow-hidden">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Album cover"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium leading-none">Song Title</h3>
              <p className="text-xs text-muted-foreground">Artist Name</p>
            </div>
          </div>
          <div className="space-y-2 w-1/2">
            <div className="flex justify-center items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon" className="rounded-full">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Repeat className="h-4 w-4" />
              </Button>
            </div>
            <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
          </div>
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <Slider defaultValue={[66]} max={100} step={1} className="w-20" />
          </div>
        </div>
      </footer>
      <footer>{<AudioPlayer />} </footer>
    </div>
  );
}
