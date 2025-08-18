import React, { useState } from "react";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import genres from "../../constants/genres";


type Movie = {
  id: number;
  poster_path: string;
  title: string;
  vote_average?: number;
  release_date?: string;
  genre_ids: number[];
};

type MovieCardProp = {
  title: string;
  allMovie: Movie[];
};

const MovieCard: React.FC<MovieCardProp> = ({ title, allMovie }) => {
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);

  if (!allMovie || allMovie.length === 0) return null;


  
  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>

      <div 
        className="flex overflow-x-auto space-x-4 pb-4" 
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {allMovie.map((eachMovie) => {

          const allGenre = eachMovie.genre_ids?.map((id) => {
            const g = genres.find((gen) => gen.id === id);
            return g?.name;
          }) ;

          return ( <div
            key={eachMovie.id}
            className="w-44  flex-shrink-0 relative group cursor-pointer"
            onMouseEnter={() => setHoveredMovie(eachMovie.id)}
            onMouseLeave={() => setHoveredMovie(null)} 
          >
            {/* Movie Poster */}
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:z-20">
              <img
                src={`https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`}
                alt={eachMovie.title}
                className="w-full h-64 object-cover rounded-md"
              />
            </div>

            {/* Popup Card - Only shows when hovering */}
            {hoveredMovie === eachMovie.id && (
 <div className="absolute top-0 left-0 w-70 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 px-4 py-2 transform -translate-y-2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300">
                
                {/* Mini Poster at top of popup */}
                <div className="w-full h-36 rounded-md  overflow-hidden mb-2 bg-gray-800">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`}
                    alt={eachMovie.title}
                    className="w-full h-full object-cover "
                  />
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-2 mb-2">
                  {/* Play Button */}
                  <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                  
                  {/* Add to List Button */}
                  <button className="border-2 border-gray-600 text-white rounded-full p-2 hover:border-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  {/* Like Button */}
                  <button className="border-2 border-gray-600 text-white rounded-full p-2 hover:border-white transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  
                  {/* More Info Button */}
                  <button className="border-2 border-gray-600 text-white rounded-full p-2 hover:border-white transition-colors ml-auto">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Movie Information */}
                <div>
                  {/* Movie Title */}
                  <h3 className="text-white font-bold text-sm mb-2">
                    {eachMovie.title}
                  </h3>
                  
                  {/* Movie Stats Row */}
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-1">
                    {/* Rating as Match Percentage */}
                    {eachMovie.vote_average && (
                      <span className="text-green-400 font-semibold">
                        {Math.round(eachMovie.vote_average * 10)}% Match
                      </span>
                    )}
                    
                    {/* Release Year */}
                    {eachMovie.release_date && (
                      <span>{new Date(eachMovie.release_date).getFullYear()}</span>
                    )}
                    
                    {/* HD Badge */}
                    <span className="border border-gray-600 px-1 rounded text-xs">HD</span>
                  </div>

                  <div className="text-gray-300 flex gap-3">
                    {allGenre?.length > 3 ? (allGenre?.slice(0, 3).map((eachgen) => <h3>{eachgen}</h3>))  :   allGenre?.map((gen) => <h3>{gen}</h3>)}                        
                  </div>
                </div>
              </div>
            )}
          </div>
        )
        })}
      </div>
    </div>
  );
};

export default MovieCard;

