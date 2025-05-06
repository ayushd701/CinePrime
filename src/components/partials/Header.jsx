import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../index";
import { RiPlayFill, RiInformationLine, RiStarFill } from "react-icons/ri";

const Header = ({ setLoading, loading }) => {
  const [wallpaper, setWallpaper] = useState(null);

  const GetWall = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      const randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    GetWall();
  }, [setLoading]);

  if (!wallpaper) return <Loading />;

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">

      <img
        src={`https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || wallpaper.profile_path}`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-0"></div>
      
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-4 md:px-8 pb-12 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {wallpaper.name ||
              wallpaper.title ||
              wallpaper.original_name ||
              wallpaper.original_title}
          </h1>

          <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
            <span className="flex items-center">
              <RiStarFill className="text-yellow-400 mr-1" />
              {wallpaper.vote_average?.toFixed(1) || "N/A"}
            </span>
            <span>
              {wallpaper.release_date || wallpaper.first_air_date || "N/A"}
            </span>
            <span className="capitalize bg-[#6556CD] px-2 py-1 rounded text-xs">
              {wallpaper.media_type}
            </span>
          </div>

          <p className="mb-6 text-sm md:text-base max-w-2xl line-clamp-3">
            {wallpaper.overview}
          </p>

          <div className="flex gap-4">
            <Link
              to={`/${wallpaper.media_type}/details/${wallpaper.id}/trailer`}
              className="flex items-center bg-[#6556CD] hover:bg-[#7b6be6] px-6 py-2 rounded-full font-medium transition-colors"
            >
              <RiPlayFill className="mr-2" /> Watch Trailer
            </Link>
            <Link
              to={`/${wallpaper.media_type}/details/${wallpaper.id}`}
              className="flex items-center bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full font-medium transition-colors"
            >
              <RiInformationLine className="mr-2" /> More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;