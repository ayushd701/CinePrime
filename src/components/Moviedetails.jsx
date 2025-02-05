import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removeMovie } from "../store/actions/MovieActions";
import Loading from "./Loading";
import website from "/website.png";
import wikipedia from "/wikipedia.png";
import imdb from "/imdb.png";
import Cards from "./partials/Cards";

const Moviedetails = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);
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
      className="bg-[#1F1E24] w-screen h-full px-[6%] "
    >
      {/* Part 1 navigation */}
      <nav className="w-full text-zinc-100 flex gap-10 text-2xl h-[10vh] items-center z-10 mb-3 mt-1">
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

      {/* Part 2 poster */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[74vh] object-cover rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path ||
            info.details.backdrop_path ||
            info.details.profile_path
          }`}
          alt=""
        />
        <div className="content ml-[5%] bg-gray-900 p-5 rounded-lg">
          <h1 className="text-5xl text-white font-black">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}
            <small className="font-bold text-zinc-300 text-2xl">
              ({info.details.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex  text-zinc-100 gap-5 mt-5 flex-col items-start">
            <h1 className="italic font-semibold">{info.details.tagline}</h1>
            <p>Overview : {info.details.overview}</p>
            <div>
              <span className="w-[5vh] h-[5vh] rounded-full flex justify-center items-center bg-yellow-600 text-xl font-semibold ">
                {(info.details.vote_average * 10).toFixed()}
                <sup>%</sup>
              </span>
            </div>
            <h1>Release Date : {info.details.release_date}</h1>
            <h1>
              Genre : {info.details.genres.map((g) => g.name).join(" , ")}
            </h1>
            <h1>Duration : {info.details.runtime} min</h1>
            <div className="">
              Languages :{" "}
              {info.details.spoken_languages
                .map((l) => l.english_name)
                .join(" , ")}
            </div>
            <Link
              className="bg-yellow-600 p-1 text-black rounded"
              to={`${loc}/trailer`}
            >
              <i className="ri-play-circle-fill"></i> Play Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* Part 3 details */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="bg-gray-800 p-2 rounded-md">
              Available on Platforms
            </h1>
            {info.watchproviders.flatrate.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="bg-gray-800 p-2 rounded-md">Available on rent</h1>
            {info.watchproviders.rent.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="bg-gray-800 p-2 rounded-md">Available to buy</h1>
            {info.watchproviders.buy.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      <hr className="mb-2"/>

      {/* Part 4 recommendations */}
      <div className="text-3xl text-white text-center font-black">Recommendations and Similar</div>
      <Cards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
