
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongFromId } from "../stores/song";


export default function Component() {
const tracks = useSelector((state: RootState) => state.songsHistory.items);
const dispatch:AppDispatch = useDispatch()
  if(tracks?.length===0) return (<p>No songs played yet</p>  )
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-100">
        <h1 className="text-xl font-bold text-gray-800">History</h1>
      </div>
      <ul className="divide-y divide-gray-200">
        {tracks.map((track) => (
          <li key={track.videoId} onClick={()=>{
            dispatch(fetchSongFromId(track.videoId))
          }} className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out">
            <div className="flex-shrink-0 mr-4">
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <img src={track.thumbnails[0].url} className="h-6 w-6"/>
                <span className="sr-only">Play {track.title}</span>
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{track.title}</p>
              <p className="text-sm text-gray-500 truncate">{track.author.name}</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <span className="text-sm text-gray-500">{track.lengthSeconds}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}