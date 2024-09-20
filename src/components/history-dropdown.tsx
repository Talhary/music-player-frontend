import { useState } from "react"
import { PlayIcon, ChevronDownIcon } from "lucide-react"
import { AppDispatch, RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { fetchSongFromId } from "../stores/song"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export function HistoryDropdown() {
  const tracks = useSelector((state: RootState) => state.songsHistory.items)
  const dispatch: AppDispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  if (tracks?.length === 0) return <p>No songs played yet</p>

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg border rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-100 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 max-md:hidden">History</h1>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              View History
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {tracks.map((track,i) => (
              <DropdownMenuItem
                key={i}
                onSelect={() => {
                  dispatch(fetchSongFromId(track.videoId))
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center w-full">
                  <img src={track?.thumbnails?.[0]?.url} className="h-6 w-6 mr-2" alt={track.title} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{track.title}</p>
                    <p className="text-xs text-gray-500 truncate">{track.author.name}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{track.duration}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ul className="divide-y divide-gray-200 hidden lg:block">
        {tracks.map((track,i) => (
          <li
            key={i}
            onClick={() => {
              dispatch(fetchSongFromId(track.videoId))
            }}
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
          >
            <div className="flex-shrink-0 mr-4">
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <img src={track.thumbnails[0].url} className="h-6 w-6" alt={track.title} />
                <span className="sr-only">Play {track.title}</span>
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{track.title}</p>
              <p className="text-sm text-gray-500 truncate">{track.author.name}</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <span className="text-sm text-gray-500">{track.duration}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}