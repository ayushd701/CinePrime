import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Topnav, Dropdown, Cards } from "./partials/partial";
import { Loading } from "./index";
import axios from "../utils/axios";

const People = () => {
  document.title = "People";
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get("/person/popular");
      setPeople(data.results);
    } catch (error) {
      console.log("Error getting people", error);
    }
  };

  useEffect(() => {
    GetPeople();
  }, []);

  return people.length > 0 ? (
    <div className="p-4 md:p-6 bg-[#1F1E24] w-full min-h-screen overflow-y-auto">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-[#6556CD] mr-3 text-2xl"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400">
            People
          </h1>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-end sm:items-center gap-3">
          <div className="w-full sm:w-auto">
            <Topnav mobileVersion={true} />
          </div>
        </div>
      </div>

      <Cards data={people} title="person" />
    </div>
  ) : (
    <Loading />
  );
};

export default People;