
import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import { Music, Radio, Mic2, ListMusic, Heart, Plus } from "lucide-react"

export function MusicNav() {
  return (
    <ScrollArea className="h-screen w-64 bg-background border-r">
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Your Library</h2>
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary">
            <Music className="h-4 w-4" />
            <span>Listen Now</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary">
            <Radio className="h-4 w-4" />
            <span>Browse</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary">
            <Radio className="h-4 w-4" />
            <span>Radio</span>
          </a>
        </nav>
        <Separator />
        <h3 className="text-sm font-medium">Playlists</h3>
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary">
            <ListMusic className="h-4 w-4" />
            <span>All Songs</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary">
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-sm hover:text-primary">
            <Mic2 className="h-4 w-4" />
            <span>Top Hits</span>
          </a>
        </nav>
        <Separator />
        <button className="flex items-center space-x-3 text-sm hover:text-primary">
          <Plus className="h-4 w-4" />
          <span>New Playlist</span>
        </button>
      </div>
    </ScrollArea>
  )
}