import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Loading} from "../index";

const Header = ({ setLoading , loading }) => {
  const [wallpaper, setWallpaper] = useState(null);

  const GetWall = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      let randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
      setLoading(false);
    } catch (error) {
      console.log("Error :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    GetWall();
  }, [setLoading]);

  if (!wallpaper) {
    return (
      <div className="text-white h-full w-screen absolute top-0 left-0 flex bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <Link to={`${wallpaper.media_type}/details/${wallpaper.id}`}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${
          wallpaper.backdrop_path || wallpaper.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col items-start justify-end p-[2%]"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {wallpaper.name ||
          wallpaper.title ||
          wallpaper.original_name ||
          wallpaper.original_title}
      </h1>
      <p className="w-[70%] text-white mt-3 mb-3">{wallpaper.overview.slice(0,200)} <Link className = "text-blue-400" >..more</Link>  </p>
      <p className="text-white">
        <i className="text-yellow-400  ri-megaphone-fill" ></i> {wallpaper.release_date || "No information"} 
        <i className="ml-3 text-yellow-400 ri-album-fill" ></i> {wallpaper.media_type.toUpperCase()}
      </p>
      <Link className="bg-[#6556CD] p-2 mt-5 rounded font-semibold"> <i className="ri-play-circle-fill"></i>  Watch Trailer</Link>
    </Link>
  );
};

export default Header;


