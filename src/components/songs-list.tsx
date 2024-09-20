import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylistSongs } from '../stores/play-list-songs'; // Update the correct import path
import { RootState, AppDispatch } from '../store';
import { Button } from '../components/ui/button'; // Assuming you have a Button component
import { Play } from 'lucide-react'; // Assuming you have this icon available
import { fetchSongFromId } from '../stores/song';

export const PlaylistSongsComponent: React.FC = () => {
  const { songs, loading, error } = useSelector((state: RootState) => state.PlayLists); // Corrected to match the slice name
  
  const [list,setList] = useState(songs)
  
  useEffect(()=>{
    setList(songs)
  },[songs])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-5 gap-4">
      {list.map((song, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-square bg-muted relative">
            <img
              src={song.thumbnailUrl}
              alt={`Album cover ${i + 1}`}
              className="rounded-md object-cover w-full h-full"
            />
            <Button
              onClick={() => {
                // Placeholder for the fetch function; update with your actual function
                fetchSongFromId(song.youtubeId);
                // dispatch(fetchSongFromId(song.youtubeId)); // Uncomment and replace with the actual function
              }}
              size="icon"
              className="absolute bottom-2 right-2 rounded-full"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1 text-sm">
            <h3 className="font-medium leading-none">{song.title}</h3>
            <p className="text-xs text-muted-foreground">
              {song.artists.map((artist) => artist.name).join(', ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
