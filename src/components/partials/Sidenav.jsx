import React from "react";
import { Link } from "react-router-dom";

export default function Sidenav() {
  const navItems1 = [
    {
      title: "Trending",
      to: "/",
      icon : <i class="ri-fire-fill"></i>
    },
    {
      title: "Popular",
      to: "/",
      icon : <i class="ri-bard-fill"></i>
    },
    {
      title: "Movies",
      to: "/",
      icon : <i class="ri-movie-2-fill"></i>
    },
    {
      title: "Tv Shows",
      to: "/",
      icon : <i class="ri-tv-2-fill"></i>
    },
    {
      title: "People",
      to: "/",
      icon : <i class="ri-team-fill"></i>
    }
  ];
  const navItems2 = [
    {
      title: "Trending",
      to: "/",
      icon : <i class="ri-fire-fill"></i>
    },
    {
      title: "Popular",
      to: "/",
      icon : <i class="ri-bard-fill"></i>
    },
  ];
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-300 p-7">
      <h1 className="text-2xl text-white font-bold">
        <i class=" text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>CinePrime</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-xl text-white font-semibold mt-8 mb-5">
          New Feeds
        </h1>
        {navItems1.map((item) => (
          <Link to={item.to} className="hover:bg-[#6556CD] hover:text-white p-5 duration-300 rounded-lg" >{item.icon} {item.title}</Link>
        ))}
      </nav>
      <hr />
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-xl text-white font-semibold mt-8 mb-5">
          New Feeds
        </h1>
        {navItems2.map((item) => (
          <Link to={item.to} className="hover:bg-[#6556CD] hover:text-white p-5 duration-300 rounded-lg" >{item.icon} {item.title}</Link>
        ))}
      </nav>
    </div>
  );
}
