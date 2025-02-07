import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removeTv } from "../store/actions/TvActions";
import Loading from "./Loading";
import website from "/website.png";
import wikipedia from "/wikipedia.png";
import imdb from "/imdb.png";

const Tvdetails = () => {
  const loca = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    if (info && info.details) {
      document.title = `${info.details.name}`;
    }
  }, [info]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#1F1E24] w-[100%] px-[6%] "
    >
      {/* Part 1 navigation */}
      <nav className="w-full text-zinc-100 flex gap-10 text-3xl h-[10vh] items-center z-10 mb-3 mt-1 justify-between">
        <div className="flex gap-x-10 ">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#587bb4] mr-2  ri-arrow-left-line"
          ></Link>
          <Link
            to="/"
            className="hover:text-[#587bb4] mr-2  ri-home-4-line"
          ></Link>
        </div>
        <div className="flex  gap-x-10 p-5">
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
        </div>
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
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex  text-zinc-100 gap-5 mt-5 flex-col items-start">
            <h1 className="italic font-semibold ">{info.details.tagline}</h1>
            <p className="line-clamp-2">Overview : {info.details.overview}</p>
            <div>
              <span className="w-[5vh] h-[5vh] rounded-full flex justify-center items-center bg-yellow-600 text-xl font-semibold ">
                {(info.details.vote_average * 10).toFixed()}
                <sup>%</sup>
              </span>
            </div>
            <h1>Release Date : {info.details.first_air_date}</h1>
            <h1>
              Genre : {info.details.genres.map((g) => g.name).join(" , ")}
            </h1>
            <div className="">
              Languages :{" "}
              {info.details.spoken_languages
                .map((l) => l.english_name)
                .join(" , ")}
            </div>
            <h1>Number of seasons : {info.details.number_of_seasons} </h1>
            <h1>Number of episodes : {info.details.number_of_episodes} </h1>
            <Link
              className="bg-yellow-600 p-1 text-black rounded"
              to={`${loca.pathname}/trailer`}
            >
              <i className="ri-play-circle-fill"></i> Play Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* Part 3 details */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10 mb-5">
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
      <hr className="mb-5" />

      {/* Part 4 seasons  */}
      <div className="text-3xl text-white text-center font-black mb-5">
        Seasons
      </div>
      <div className="w-[100%] h-[35vh] flex overflow-y-hidden  mb-5">
        {info.details.seasons.length > 0 ? (
          info.details.seasons.map((data, index) => (
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              key={index}
              className="min-w-[15%] h-full mr-5 mb-5 hover:scale-[1.1] transform rounded-lg transition-transform duration-300"
            >
              {data.backdrop_path || data.poster_path ? (
                <img
                  className="w-full h-[75%] object-cover rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.poster_path
                  }`}
                  alt=""
                />
              ) : (
                <h1 className="w-full h-[75%] object-cover rounded-t-lg text-white flex items-center justify-center">
                  No image found
                </h1>
              )}

              <div className="text-white p-3 h-[25%]">
                <h1 className="text-xl font-semibold truncate">
                  {data.name ||
                    data.title ||
                    data.original_name ||
                    data.original_title}
                </h1>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl text-white font-black text-center mt-5">
            Nothing to show
          </h1>
        )}
      </div>
      <hr className="mb-5" />

      {/* Part 5 recommendations , Hor cards section */}
      <div className="text-3xl text-white text-center font-black mb-5">
        Recommendations and Similar
      </div>
      <div className="w-[100%] h-[35vh] flex overflow-y-hidden  mb-3">
        {info.recommendations.length > 0 || info.similar.length > 0 ? (
          (info.recommendations.length > 0
            ? info.recommendations
            : info.similar
          ).map((data, index) => (
            <Link
              to={`/${data.first_air_date ? "tv" : "movie"}/details/${data.id}`}
              key={index}
              className="min-w-[15%] bg-zinc-900 h-full mr-5 mb-5 hover:scale-[1.1] transform rounded-lg transition-transform duration-300"
            >
              {data.backdrop_path || data.poster_path ? (
                <img
                  className="w-full h-[55%] object-cover rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.poster_path
                  }`}
                  alt=""
                />
              ) : (
                <h1 className="w-full h-[55%] object-cover rounded-t-lg text-white flex items-center justify-center">
                  No image found
                </h1>
              )}

              <div className="text-white p-3 h-[45%]">
                <h1 className="text-xl font-semibold truncate">
                  {data.name ||
                    data.title ||
                    data.original_name ||
                    data.original_title}
                </h1>
                <p className="text-sm line-clamp-3">
                  {data.overview.slice(0, 100)}{" "}
                  <span className="text-zinc-300">..more</span>{" "}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl text-white font-black text-center mt-5">
            Nothing to show
          </h1>
        )}
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;
