import React, { useState, useEffect } from "react";
import { Header, Sidenav, Topnav ,HorCards} from "./partials/partial";

const Home = () => {
  document.title = "HomePage";
  const [loading , setLoading] = useState(true)
  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-full ml-[20%] overflow-auto overflow-x-hidden">
        {!loading && <Topnav />}
        <Header setLoading={setLoading} />
        <HorCards setLoading={setLoading}  />
      </div>
    </>
  ) 
};

export default Home;
