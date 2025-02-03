import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Topnav, Dropdown, Cards } from "./partials/partial";
import { Loading } from "./index";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page , setPage] = useState(1)

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);
    //   setTrending(data.results);
    setTrending((prev) => [...prev ,...data.results])
    setPage(page+1)
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
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-2  ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["all", "movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["day", "week"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
        <Cards data={trending} title={category} />
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
