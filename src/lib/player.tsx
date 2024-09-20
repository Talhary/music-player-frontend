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
    if(state == 'failed') return
    
    if (!songF) return;
    
    if (audioRef.current) audioRef.current.pause();
    if (songsHistory.filter((el) => el.videoId == songF.videoId).length == 0) {
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

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      if (!song) return;
      const duration = audioRef.current.duration;
      setSong({
        ...song,
        duration: `${Math.floor(duration / 60)}:${Math.floor(duration % 60)
          .toString()
          .padStart(2, "0")}`,
      });
      setCurrentTime(audioRef.current.currentTime);
    }
  };

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
          onLoadedMetadata={handleLoadedMetadata}
          controls
          className="hidden"
          autoPlay
          onLoad={(e) => {
            setAudioLoading(true);
          }}
          onPlaying={() => {
            setAudioLoading(false);
          }}
        />
      )}

      <div className=" flex-col items-center space-y-4 hidden">
        <input
          type="range"
          min={0}
          max={audioRef.current?.duration || 0}
          value={currentTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (audioRef.current) {
              const newTime = Number(e.target.value);
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }
          }}
          className="w-full accent-teal-500"
        />
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPauseClick}
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 focus:outline-none"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={handleMuteToggle}
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 focus:outline-none"
          >
            {audioRef.current?.volume === 0 ? "Unmute" : "Mute"}
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={100}
          onChange={handleVolumeChange}
          className="w-full mt-2 accent-teal-500"
        />
        <div className="text-white mt-2">
          Duration: {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </div>
     
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
                      src={song.thumbnails[0].url}
                      alt="Album cover"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium leading-none">{song.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {song.author.name}
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
                        dispatch(fetchNextSong(song.videoId));
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
