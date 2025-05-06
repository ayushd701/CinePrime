import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Notfound } from "../index";
import { RiCloseFill } from "react-icons/ri";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.95)] backdrop-blur-sm">

      <button
        onClick={() => navigate(-1)}
        className="absolute right-4 top-4 z-50 text-white hover:text-[#587bb4] transition-colors duration-300"
      >
        <RiCloseFill className="text-4xl md:text-5xl" />
      </button>

      <div className="relative w-full h-auto max-w-6xl px-4">
        {ytvideo?.key ? (
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <ReactPlayer
              controls
              url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                  }
                }
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <Notfound />
            <p className="mt-4 text-xl text-white">
              Trailer not available for this content
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-6 py-2 bg-[#587bb4] hover:bg-[#48699c] text-white rounded-lg transition-colors duration-300"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trailer;
