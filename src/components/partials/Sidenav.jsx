import React from "react";
import { Link } from "react-router-dom";

export default function Sidenav() {
  const navItems1 = [
    {
      title: "Trending",
      to: "/trending",
      icon : <i className="mr-2 ri-fire-fill"></i>
    },
    {
      title: "Popular",
      to: "/popular",
      icon : <i className="mr-2 ri-bard-fill"></i>
    },
    {
      title: "Movies",
      to: "/movies",
      icon : <i className="mr-2 ri-movie-2-fill"></i>
    },
    {
      title: "Tv Shows",
      to: "/tv_shows",
      icon : <i className="mr-2 ri-tv-2-fill"></i>
    },
    {
      title: "People",
      to: "/people",
      icon : <i className="mr-2 ri-team-fill"></i>
    }
  ];
  const navItems2 = [
    {
      title: "About",
      to: "/about",
      icon : <i className="mr-2 ri-information-fill"></i>
    },
    {
      title: "Contact Us",
      to: "/contact",
      icon : <i className="mr-2 ri-phone-fill"></i>
    },
  ];
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-300 p-8 fixed">
      <h1 className="text-2xl text-white font-bold">
        <i className=" text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>CinePrime</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-xl text-white font-semibold mt-8 mb-4">
          New Feeds
        </h1>
        {navItems1.map((item , index) => (
          <Link key={index} to={item.to} className="hover:bg-[#6556CD] hover:scale-105 hover:text-white p-4 duration-300 rounded-lg" >{item.icon} {item.title}</Link>
        ))}
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400 mt-1" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-xl text-white font-semibold mt-6 mb-4">
          Website Information
        </h1>
        {navItems2.map((item , index) => (
          <Link key={index} to={item.to} className="hover:bg-[#6556CD] hover:text-white p-4 duration-300 rounded-lg" >{item.icon} {item.title}</Link>
        ))}
      </nav>
    </div>
  );
}