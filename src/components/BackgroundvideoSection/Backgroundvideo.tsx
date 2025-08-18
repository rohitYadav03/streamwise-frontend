import type React from "react";
import useMovieStore from "../../store/movieStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Play, Info, Volume2, VolumeX } from "lucide-react";

interface TmdbVideo {
  site: string;
  type: string;
  key: string;
  name: string;
}

const Backgroundvideo: React.FC = () => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const { backgroundMovie } = useMovieStore();
  const movieId = backgroundMovie?.id;

  const videoDetails = async () => {
    
    const videoData = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );

    const allVideos: TmdbVideo[] = videoData.data.results;
    
    const trailerKey = allVideos.filter(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    setVideoKey(trailerKey[0]?.key || trailerKey[1]?.key || null);
  };

  useEffect(() => {
    if (!movieId) return;
    videoDetails();
  }, [movieId]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return videoKey ? (

    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Container */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="w-full h-full scale-150 -translate-y-16"
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&loop=1&playlist=${videoKey}&iv_load_policy=3&fs=0&showinfo=0&enablejsapi=1&start=10`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent"></div>

      {/* Content Container */}
      <div className="absolute  inset-0 flex items-center">
        <div className="px-4 md:px-12 lg:px-16 max-w-2xl">
          {/* Movie Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            {backgroundMovie?.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 drop-shadow-lg overflow-hidden">
            {backgroundMovie?.overview}
          </p>

         
          <div className=" flex items-center gap-6 mb-8">
            <button className="flex items-center gap-2 bg-white text-black text-lg font-semibold py-3 px-8 rounded hover:bg-white/80 transition-colors duration-200">
              <Play className="w-6 h-6 fill-current" />
              Play
            </button>
            
            <button className="flex items-center gap-2 bg-white/20 text-white text-lg font-semibold py-3 px-6 rounded hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm">
              <Info className="w-6 h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Mute/Unmute Button */}
      <button 
        onClick={toggleMute}
        className="absolute cursor-pointer bottom-49 right-8 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors duration-200 backdrop-blur-sm"
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>

      
     
    </div>
  ) : (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
};

export default Backgroundvideo;