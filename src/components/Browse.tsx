import type React from "react";
import Header from "./Header";
import axios from "axios";
import { useEffect } from "react";

import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Browse : React.FC = () => {
const navigate = useNavigate()
  const {user} = useUserStore();

  if(!user){
    navigate("/");
    return;
  }

    const fetchNowPlayingMovies = async() => {
  const movieResponse = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
    headers : {
accept : "application/json",
Authorization : `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
  }
})
console.log(movieResponse.data);
    }

    useEffect(() => {
    fetchNowPlayingMovies()
},[])

    return <div
    className=" w-full h-screen"
    >
<Header />

<h1 className="">Browsr</h1>
    </div> 
}

export default Browse;