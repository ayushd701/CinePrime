import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removeMovie } from "../store/actions/MovieActions";
import Loading from "./Loading";
import website from "/website.png";
import wikipedia from "/wikipedia.png";
import imdb from "/imdb.png";

const Moviedetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, []);
  const { info } = useSelector((state) => state.movie);
  console.log(info);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#1F1E24] w-screen h-screen px-[6%]"
    >
      {/* Part 1 navigation */}
      <nav className="w-full text-zinc-100 flex gap-10 text-2xl h-[10vh] items-center">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#587bb4] mr-2  ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <img className="w-[4vh] rounded-md" src={website} alt="" />
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <img className="w-[4vh] rounded-md" src={wikipedia} alt="" />
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          <img className="w-[4vh] rounded-md" src={imdb} alt="" />
        </a>
      </nav>

      {/* Part 2 poster and detail */}
      
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
