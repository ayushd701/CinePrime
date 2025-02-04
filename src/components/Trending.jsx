import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Topnav, Dropdown, Cards } from "./partials/partial";
import { Loading } from "./index";
import axios from "../utils/axios";

const Trending = () => {
  document.title = "Trending ";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);
      //   setTrending(data.results);
      setTrending(data.results);
      console.log(data);
    } catch (error) {
      console.log("Error getting trending");
    }
  };

  useEffect(() => {
    GetTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" p-[1.5%] bg-[#1F1E24] w-full h-screen overflow-y-auto">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-400 ml-3">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-2  ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown title="Category" func={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="tv">Tv</option>
          </Dropdown>
          <div className="w-[2%]"></div>
          <Dropdown title="Category" func={(e) => setDuration(e.target.value)}>
            <option value="day">Day</option>
            <option value="week">Week</option>
          </Dropdown>
        </div>
      </div>
      <Cards data={trending} title= {category}/>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
