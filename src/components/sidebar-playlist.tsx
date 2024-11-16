
import { Clock } from "lucide-react"
import { fetchSongs, selectSongs, selectSongsError, selectSongsStatus } from "../stores/playListSongs"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { AppDispatch } from "../store"
import { useEffect } from "react"
import { useToast } from "../hooks/use-toast"
import { Button } from "../components/ui/button"
import { ToastAction } from "../components/ui/toast"
import { type Song } from "../types/song"

export function SidebarPlaylist() {
  const {toast } = useToast();
  const dispatch: AppDispatch = useDispatch();
  const sampleSongs:Song[] = useSelector((state: RootState) => selectSongs(state));
  const status = useSelector((state: RootState) => selectSongsStatus(state));
  const error = useSelector((state: RootState) => selectSongsError(state));
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSongs());
    }
  }, [dispatch, status]);
  if (status === 'loading') return <div>
       Loading..
  </div>;
  if (status === 'failed') return <div>
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "ERROR",
          description: {error},
          action: (
            <ToastAction altText="Error">Undo</ToastAction>
          ),
        })
      }}
    >
      
    </Button>
  </div>;
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Playlist</h2>
      <ul className="space-y-2">
        {sampleSongs.map((song) => (
          <li key={song.videoId} className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded">
            <img  
              src={song.thumbnails[0].url}
              alt={`${song.title} album cover`}
              width={40}
              height={40}
              className="rounded"
            />
            <div className="flex-grow min-w-0">
              <p className="text-sm font-medium truncate">{song.title}</p>
              <p className="text-xs text-gray-400 truncate">{song.author.name}</p>
            </div>
            <span className="text-xs text-gray-400 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {song.lengthSeconds}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}