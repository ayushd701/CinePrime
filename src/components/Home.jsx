import React, { useState, useEffect } from "react";
import { Header, Sidenav, Topnav } from "./partials/partial";
import axios from "../utils/axios";

const Home = () => {
  document.title = "HomePage";
  const [loading , setLoading] = useState(true)
  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-full">
        {!loading && <Topnav />}
        <Header setLoading={setLoading} />
      </div>
    </>
  ) 
};

export default Home;
