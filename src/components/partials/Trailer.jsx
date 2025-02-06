import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {Notfound} from "../index";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);
  return (
    <div className="flex w-screen h-screen items-center justify-center absolute top-0 left-0 z-10 bg-[rgba(0,0,0,0.9)]">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#587bb4] mr-2  ri-close-fill text-4xl absolute text-white right-[5%] top-[5%] "
      ></Link>
      {(ytvideo && ytvideo.key) ? <ReactPlayer
        height={500}
        width={1000}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      /> : <Notfound />}
    </div>
  );
};

export default Trailer;
