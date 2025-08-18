import type React from "react";
import Header from "./Header";
import useMovieStore from "../store/movieStore";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Backgroundvideo from "./BackgroundvideoSection/Backgroundvideo";
import MovieCard from "./BackgroundvideoSection/MovieCard";

const Browse : React.FC = () => {
  const {allMovie , popularMovie , topRated, upcoming} = useMovieStore();
const navigate = useNavigate();
const {fetchNowPlayingMovie ,backgroundMovie} = useMovieStore();
  const {user} = useUserStore();

  if(!user){
    navigate("/");
    return;
  }

    // fetch data when component loads
  useEffect(() => {
 fetchNowPlayingMovie();
  },[])

   return(
<div className="w-full min-h-screen bg-black">
<Header />
{backgroundMovie && <Backgroundvideo />}  


<div className=" relative z-10 -mt-40 pb-16">

<div className="bg-gradient-to-b from-transparent via-black/50 to-black px-4 md:px-12 lg:px-16 pt-8 pb-6">
  <MovieCard title="🎬 Now Playing" allMovie={allMovie} />
</div>


<div className="px-4 md:px-12 lg:px-16 space-y-8">

          <MovieCard title="🔥Popular Movie" allMovie={popularMovie} />
          <MovieCard title="⭐ Top Rated" allMovie={topRated} />
          <MovieCard title="⏳ Upcoming" allMovie={upcoming} />
       

</div>
</div>
  </div> 
  );
}

export default Browse;