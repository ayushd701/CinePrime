import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/no_image.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex items-center px-4 border-gray-300">
      <i className="text-3xl text-gray-400 ri-search-line ml-10"></i>

      <input
        spellCheck="false"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(e.target.value.length > 0);
        }}
        className="w-full max-w-lg text-white mx-4 p-3 bg-transparent text-lg outline-none border-none border-transparent"
        type="text"
        placeholder="Search..."
      />

      {query.length > 0 && (
        <i
          onClick={() => {
            setQuery("");
            setShowResults(false);
          }}
          className="text-3xl text-gray-400 cursor-pointer ri-close-fill"
        ></i>
      )}

      {showResults && (
        <div className="z-10 absolute flex flex-col w-full ml-20 max-w-lg max-h-60 bg-white shadow-lg top-[100%] left-4 rounded-lg overflow-auto ">
          {searches.map((item, index) => (
            <Link
            to={`/${item.media_type}/details/${item.id}`}
              key={index}
              className="text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100 font-semibold duration-300 hover:text-black hover:bg-zinc-200"
            >
              <img
                className=" w-[10vh] shadow h-[10vh] object-cover rounded mr-5"
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.backdrop_path || item.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {item.name ||
                  item.title ||
                  item.original_name ||
                  item.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
