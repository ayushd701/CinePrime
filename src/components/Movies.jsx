import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Topnav, Dropdown, Cards } from "./partials/partial";
import { Loading } from "./index";
import axios from "../utils/axios";

const Movies = () => {
  document.title = "Movies";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}`);
      setMovies(data.results);
    } catch (error) {
      console.log("Error getting movies", error);
    }
  };

  useEffect(() => {
    GetMovies();
  }, [category]);

  return movies.length > 0 ? (
    <div className="p-4 md:p-6 bg-[#1F1E24] w-full min-h-screen overflow-y-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-[#6556CD] mr-3 text-2xl"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400">
            Movies
          </h1>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-end sm:items-center gap-3">
          <div className="w-full sm:w-auto">
            <Topnav mobileVersion={true} />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="flex-1 min-w-[150px]">
              <Dropdown 
                title="Category" 
                func={(e) => setCategory(e.target.value)}
                className="w-full"
              >
                <option value="now_playing">Now Playing</option>
                <option value="upcoming">Upcoming</option>
                <option value="top_rated">Top Rated</option>
                <option value="popular">Popular</option>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <Cards data={movies} title="movie" />
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
