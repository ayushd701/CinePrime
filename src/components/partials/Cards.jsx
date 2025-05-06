import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title = "" }) => {
  console.log(data);
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-wrap justify-center gap-x-6 lg:gap-x-12 gap-y-10 pt-[5%] px-4 md:px-10">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[25vh] hover:scale-105 duration-300"
          key={i}
        >
          {c.poster_path || c.backdrop_path || c.profile_path ? (
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                c.poster_path || c.backdrop_path || c.profile_path
              }`}
              alt=""
            />
          ) : (
            <h1 className="w-full h-[40vh] object-cover rounded-t-lg text-white flex items-center justify-center">
              No image found
            </h1>
          )}
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold truncate">
            {c.title || c.name || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="text-white w-[5vh] h-[5vh] rounded-full flex justify-center items-center bg-yellow-600 text-xl font-semibold absolute right-[-10%] bottom-[25%]">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
