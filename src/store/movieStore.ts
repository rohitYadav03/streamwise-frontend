import { create } from "zustand";
import axios from "axios";

interface MovieStore {
    backgroundMovie : any;
    allMovie: any;
    popularMovie : any;
    setBackgroundMovie : (movie : any) => void;
    fetchNowPlayingMovie : () => Promise<void>;
    topRated : any;
    upcoming : any;
}

const useMovieStore = create<MovieStore>((set) => ({
backgroundMovie : null,
upcoming : null,
allMovie:null,
popularMovie : null,
topRated : null,
setBackgroundMovie : (movie : string) => set({backgroundMovie : movie}),


fetchNowPlayingMovie : async() => {
 
const movieResponse = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?language=hi&page=1&region=IN",
    {
        headers : {
            accept : "application/json",
            Authorization : `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    }
)    
   
const firstMovie = movieResponse.data.results[0] || movieResponse.data.results[1];

    console.log("first moview", firstMovie);
    console.log("all movie :",movieResponse);
    set({allMovie : movieResponse.data.results})

const movieDetails = await axios.get(
    `https://api.themoviedb.org/3/movie/${firstMovie.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );

  const popularMovie = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, 
      {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  )

  set({popularMovie : popularMovie.data.results})

  
    
   set({backgroundMovie : movieDetails.data});

   const topReate = await axios.get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",{
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    });

    const upcoming = await axios.get("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", {
        headers : {
            accept : "application/json",
            Authorization : `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    })
    set({upcoming : upcoming.data.results})

    set({topRated : topReate.data.results})
},

}));


export default useMovieStore;
