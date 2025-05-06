import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Dropdown } from "./partial";
import { Link } from "react-router-dom";
import { RiMovie2Fill, RiTvFill, RiStarFill } from "react-icons/ri";

const HorCards = ({ setLoading, loading }) => {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const GetTrending = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetTrending();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Trending Now</h1>
        <Dropdown 
          title="Filter" 
          func={(e) => setCategory(e.target.value)}
          className=" text-white rounded-lg px-4 py-1"
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </Dropdown>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto pb-6 scrollbar-hide space-x-4">
          {trending.map((data) => (
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              key={data.id}
              className="flex-none w-48 md:w-56 bg-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
            >
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={
                    data.backdrop_path || data.poster_path
                      ? `https://image.tmdb.org/t/p/w500${data.backdrop_path || data.poster_path}`
                      : '/no_image.jpg'
                  }
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center bg-black/60 px-2 py-1 rounded">
                  <RiStarFill className="text-yellow-400 mr-1" />
                  <span className="text-white text-sm">
                    {data.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center text-zinc-400 text-xs mb-1">
                  {data.media_type === 'movie' ? (
                    <RiMovie2Fill className="mr-1" />
                  ) : (
                    <RiTvFill className="mr-1" />
                  )}
                  {data.release_date?.split('-')[0] || data.first_air_date?.split('-')[0] || 'N/A'}
                </div>
                <h3 className="text-white font-semibold truncate mb-2 group-hover:text-[#6556CD] transition-colors">
                  {data.name || data.title || data.original_name || data.original_title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-2">
                  {data.overview}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorCards;
