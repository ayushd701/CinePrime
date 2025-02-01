import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="w-full h-[10vh] relative flex items-center px-4 border-b border-gray-300">

      <i className="text-3xl text-gray-400 ri-search-line ml-10"></i>

      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(e.target.value.length > 0);
        }}
        className="w-full max-w-lg mx-4 p-3 bg-transparent text-lg outline-none border-none"
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
        <div className="absolute flex flex-col w-full max-w-lg max-h-60 bg-white shadow-lg top-[100%] left-4 rounded-lg overflow-auto border border-gray-200">
          <Link className="p-4 border-b border-gray-100 hover:bg-gray-100 cursor-pointer">
            🔍 Result 1
          </Link>
          <Link className="p-4 border-b border-gray-100 hover:bg-gray-100 cursor-pointer">
            🔍 Result 2
          </Link>
          <Link className="p-4 hover:bg-gray-100 cursor-pointer">
          🔍 Result 3
          </Link>
        </div>
      )}
    </div>
  );
};

export default Topnav;
