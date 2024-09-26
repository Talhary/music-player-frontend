import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchNextSong, fetchSongFromId } from "../stores/song";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import {
  
  Pause,
  Play,
  
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  
  VolumeOff,
  Loader2,
} from "lucide-react";
import { addItemToSearchHistory } from "../stores/songs-history";

const AudioPlayer = () => {
  const songF = useSelector((state: RootState) => state.song.data);
  
  const state = useSelector((state: RootState) => state.song.status);
  const error = useSelector((state:RootState)=>state.song.error)
  const songsHistory = useSelector(
    (state: RootState) => state.songsHistory.items
  );
  
  const [song, setSong] = useState(songF);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    
    if (!songF) return;
    console.log(songF)
    if (audioRef.current) audioRef.current.pause();
    if (songsHistory.filter((el) => el.youtubeId == songF.youtubeId).length == 0) {
      dispatch(addItemToSearchHistory(songF));
    }
    setSong(songF);
    setAudioLoading(true);
  }, [songF]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioLoading, setAudioLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.autoplay = isPlaying;
    }
  }, [isPlaying]);

  

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: any) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e[0]) / 100;
    }
  };

  const handlePlayPauseClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.volume = audioRef.current.volume > 0 ? 0 : 1;
    }
  };
if(state=='failed') return <div>
    Please Login to Continue
   </div>
  return (
    <div className="">
      
      {song && (
        
        <audio
          ref={audioRef}
          src={song.url}
          onTimeUpdate={handleTimeUpdate}
          
          controls
          className="hidden"
          autoPlay
          onLoad={() => {
            setAudioLoading(true);
          }}
          onPlaying={() => {
            setAudioLoading(false);
          }}
        />
      )}
      { state == "loading" && (
        <div className="w-full flex items-center h-16 justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      { song && (
        <div>
          {state == "loading" ? null : (
            <footer className="border-t bg-card p-4">
              <div className="flex items-center max-md:flex-col max-md:gap-y-3 justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 max-md:w-1/3 h-16 bg-muted relative rounded-md overflow-hidden">
                    <img
                      src={song.thumbnailUrl}
                      alt="Album cover"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium leading-none">{song.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {song.artists[0].name}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 w-1/2 max-md:w-full ">
                  <div className="flex justify-center items-center space-x-4">
                    <Button variant="ghost" size="icon">
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    {audioLoading ? (
                      <div>
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <Button
                        size="icon"
                        className="rounded-full"
                        onClick={handlePlayPauseClick}
                      >
                        {!isPlaying ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Pause className="h-4 w-4" />
                        )}
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        dispatch(fetchNextSong(song.youtubeId));
                      }}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Repeat className="h-4 w-4" />
                    </Button>
                  </div>
                  <Slider
                    min={0}
                    max={audioRef.current?.duration || 0}
                    value={[currentTime]}
                    onChange={(e: any) => {
                      if (audioRef.current) {
                        const newTime = Number(e.target.value);
                        audioRef.current.currentTime = newTime;
                        setCurrentTime(newTime);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div onClick={handleMuteToggle}>
                    {audioRef?.current?.volume == 0 ? (
                      <VolumeOff className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={[100]}
                    onValueChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
              </div>
            </footer>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
