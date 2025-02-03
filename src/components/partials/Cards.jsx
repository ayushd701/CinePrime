import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data  }) => {
  return (
    <div className="pl-[9%] pt-[5%] flex flex-wrap w-[100%] ">
      {data.map((c, i) => (
        <Link className="w-[25vh] mb-[5%] mr-[5%] hover:scale-105 duration-300" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold truncate">
            {c.title || c.name || c.original_name || c.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
