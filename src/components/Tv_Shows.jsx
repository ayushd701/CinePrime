import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Topnav, Dropdown, Cards } from "./partials/partial";
import { Loading } from "./index";
import axios from "../utils/axios";

const Tv_Shows = () => {
  document.title = "Top Movies";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [topMovies, setTopMovies] = useState([]);
  const GetTopMovies = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}`);
      setTopMovies(data.results);
      console.log(data);
    } catch (error) {
      console.log("Error getting movies");
    }
  };

  useEffect(() => {
    GetTopMovies();
  }, [category]);

  return topMovies.length > 0 ? (
    <div className=" p-[1.5%] bg-[#1F1E24] w-full h-screen overflow-y-auto">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-400 ml-3">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-2 ri-arrow-left-line"
          ></i>{" "}
          Tv Shows
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            func={(e) => setCategory(e.target.value)}
          >
            <option value="airing_today">Airing Today</option>
            <option value="on_the_air">On The Air</option>
            <option value="top_rated">Top Rated</option>
            <option value="popular">Popular</option>
          </Dropdown>
          <div className="w-[2%]"></div>
        </div>
      </div>
      <Cards data={topMovies} title="tv" />
    </div>
  ) : (
    <Loading />
  );
};

export default Tv_Shows;
