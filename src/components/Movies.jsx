import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Topnav, Dropdown, Cards } from "./partials/partial";
import { Loading } from "./index";
import axios from "../utils/axios";

const Movies = () => {
  document.title = "Movies ";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}`);
      setMovies(data.results);
      console.log(data);
    } catch (error) {
      console.log("Error getting movies");
    }
  };

  useEffect(() => {
    GetMovies();
  }, [category]);

  return movies.length > 0 ? (
    <div className=" p-[1.5%] bg-[#1F1E24] w-full h-screen overflow-y-auto">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-400 ml-3">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-2  ri-arrow-left-line"
          ></i>{" "}
          Movies
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["now_playing", "popular" , "top_rated" , "upcoming"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <Cards data={movies} title={category} />
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
