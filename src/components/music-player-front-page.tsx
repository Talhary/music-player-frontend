
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { useEffect } from "react";



import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Slider } from "../components/ui/slider";
import {

  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Loader2,
} from "lucide-react";

import AudioPlayer from "../lib/player";
import { PlaylistSongsComponent } from "./songs-list";

import { DirectSongs } from "./directSongs";
import { HistoryDropdown } from "./history-dropdown";
import { HeaderComponent } from "./header";
import { updateUser } from "../stores/user";
export function MusicPlayerFrontPage() {
  const dispatch: AppDispatch = useDispatch();

 
 
  const { type } = useSelector((state: RootState) => state.searchState);
  const tracks = useSelector(
    (state: RootState) => state.directSongsSearch.songs
  ); // Corrected to match the slice name

  

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
               
              </div>
          
                
              
               <div  className=" ">
                {tracks.length == 0 ? (
                  <h2 className="text-2xl font-semibold">
                    Please Search Song{" "}
                  </h2>
                ) : (
                  <h2 className="text-2xl py-3 font-semibold">Songs</h2>
                )}

                {type == "Playlists" && <PlaylistSongsComponent />}
                {type == "Song" && <DirectSongs />}
              </div>
              
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
