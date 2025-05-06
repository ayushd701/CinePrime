import axios from "../../utils/axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import noimage from "/no_image.jpg";
import { RiSearchLine, RiCloseFill } from "react-icons/ri";

const Topnav = ({ mobileVersion }) => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const searchRef = useRef(null);

  const GetSearches = async () => {
    try {
      if (query.length > 2) {
        const { data } = await axios.get(`/search/multi?query=${query}`);
        setSearches(data.results);
      } else {
        setSearches([]);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearches([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        clearSearch();
      }
    };

    if (searches.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searches]);

  useEffect(() => {
    const timer = setTimeout(() => GetSearches(), 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div
      className={`relative z-[50] ${
        mobileVersion
          ? "w-full"
          : "w-full h-16 flex items-center px-8 backdrop-blur-sm border-b"
      }`}
      ref={searchRef}
    >
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex items-center">
          {!mobileVersion && (
            <RiSearchLine className="text-zinc-400 text-xl absolute left-4" />
          )}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full ${
              mobileVersion ? "pl-3 pr-8 py-2 text-sm" : "pl-12 pr-10 py-3"
            } bg-zinc-700/50 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            type="text"
            placeholder="Search..."
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 text-zinc-400 hover:text-white transition-colors z-10"
            >
              <RiCloseFill className={mobileVersion ? "text-lg" : "text-xl"} />
            </button>
          )}
        </div>

        {searches.length > 0 && (
          <div
            className={`${
              mobileVersion ? "fixed" : "absolute"
            } inset-0 z-[100] ${mobileVersion ? "pt-16 px-4 bg-black/50" : ""}`}
          >
            {mobileVersion && (
              <div className="absolute inset-0" onClick={clearSearch} />
            )}
            <div
              className={`absolute top-full left-0 right-0 mt-2 bg-zinc-900 z-[60] rounded-lg shadow-xl border border-zinc-700 max-h-[70vh] overflow-y-auto ${
                mobileVersion
                  ? "max-w-2xl mx-auto"
                  : "absolute top-full left-0 right-0 mt-2"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {searches.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.media_type}/details/${item.id}`}
                  className="flex items-center p-3 hover:bg-zinc-700/50 transition-colors border-b border-zinc-700 last:border-b-0"
                  onClick={clearSearch}
                >
                  <img
                    className="w-12 h-12 object-cover rounded mr-3"
                    src={
                      item.backdrop_path || item.profile_path
                        ? `https://image.tmdb.org/t/p/w200${
                            item.backdrop_path || item.profile_path
                          }`
                        : noimage
                    }
                    alt=""
                  />
                  <div>
                    <p className="font-medium text-white">
                      {item.name || item.title}
                    </p>
                    <p className="text-xs text-zinc-400 capitalize">
                      {item.media_type} •{" "}
                      {item.release_date?.split("-")[0] ||
                        item.first_air_date?.split("-")[0] ||
                        "N/A"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnav;
