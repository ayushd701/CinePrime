import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {Dropdown} from "./partial"


const HorCards = ({ setLoading , loading }) => {
  const [trending, setTrending] = useState([]);
  const [category , setCategory] = useState("all")

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    GetTrending();
  }, [setLoading , category]);

  if(loading){
    return (
      <>
      </>
    )
  }

  return (
    <div className="w-full p-5">
      <div className="mb-5 flex justify-between">
        <h1 className="mb-5 text-3xl font-semibold text-zinc-400">Trending</h1>
        <Dropdown title="Filter" options = {['all' ,'movie',"tv"]} func={(e) => setCategory(e.target.value)}  />
      </div>

      <div className="w-[100%] flex overflow-y-hidden">
        {trending.map((data, index) => (
          <div key={index} className="min-w-[15%] bg-zinc-900 h-full mr-5 mb-5 hover:scale-[1.1] transform rounded-lg transition-transform duration-300">
            <img
              className="w-full h-[55%] object-cover rounded-t-lg"
              src={`https://image.tmdb.org/t/p/original/${
                data.backdrop_path || data.poster_path
              }`}
              alt=""
            />

            <div className="text-white p-3 h-[45%]">
              <h1 className="text-xl font-semibold truncate">
                {data.name ||
                  data.title ||
                  data.original_name ||
                  data.original_title}
              </h1>
              <p className="text-sm line-clamp-3">
                {data.overview.slice(0, 100)}{" "}
                <span className="text-zinc-300">..more</span>{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorCards;
