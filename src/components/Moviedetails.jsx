import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removeMovie } from "../store/actions/MovieActions";
import Loading from "./Loading";
import website from "/website.png";
import wikipedia from "/wikipedia.png";
import imdb from "/imdb.png";

const Moviedetails = () => {
  const loca = useLocation();
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

  useEffect(() => {
    if (info && info.details) {
      document.title = `${info.details.title || info.details.original_title}`;
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
      className="w-full min-h-screen px-4 md:px-[6%] py-6"
    >
      {/* Navigation */}
      <nav className="w-full text-zinc-100 flex justify-between items-center h-[10vh] mb-6">
        <div className="flex gap-6 text-2xl md:text-3xl">
          <button 
            onClick={() => navigate(-1)} 
            className="hover:text-[#587bb4] transition-colors ri-arrow-left-line"
          />
          <Link 
            to="/" 
            className="hover:text-[#587bb4] transition-colors ri-home-4-line"
          />
        </div>
        
        <div className="flex gap-4 md:gap-6">
          <a target="_blank" href={info.details.homepage} className="hover:scale-110 transition-transform">
            <img className="w-8 md:w-10 rounded-md" src={website} alt="Website" />
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            className="hover:scale-110 transition-transform"
          >
            <img className="w-8 md:w-10 rounded-md" src={wikipedia} alt="Wikipedia" />
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            className="hover:scale-110 transition-transform"
          >
            <img className="w-8 md:w-10 rounded-md" src={imdb} alt="IMDB" />
          </a>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Poster */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] md:h-[70vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${
              info.details.poster_path ||
              info.details.backdrop_path ||
              info.details.profile_path
            }`}
            alt="Movie Poster"
          />
        </div>

        <div className="w-full lg:w-2/3 bg-[#2D2B32]/90 p-6 rounded-lg backdrop-blur-sm">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-2">
              {info.details.name ||
                info.details.title ||
                info.details.original_name ||
                info.details.original_title}
              <span className="text-xl md:text-2xl font-semibold text-zinc-300 ml-2">
                ({info.details.release_date?.split("-")[0]})
              </span>
            </h1>
            
            {info.details.tagline && (
              <p className="italic text-lg text-zinc-300 mb-4">"{info.details.tagline}"</p>
            )}
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-yellow-600 text-lg font-bold">
                {(info.details.vote_average * 10).toFixed()}
                <sup className="text-xs">%</sup>
              </div>
              <Link
                className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-black font-medium rounded transition-colors flex items-center gap-2"
                to={`${loca.pathname}/trailer`}
              >
                <i className="ri-play-circle-fill"></i> Play Trailer
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-100 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-300 mb-1">Overview</h2>
              <p className="text-zinc-200">{info.details.overview}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Release Date: </span>
                {info.details.release_date}
              </div>
              <div>
                <span className="font-semibold">Genre: </span>
                {info.details.genres.map((g) => g.name).join(", ")}
              </div>
              <div>
                <span className="font-semibold">Duration: </span>
                {info.details.runtime} min
              </div>
              <div>
                <span className="font-semibold">Languages: </span>
                {info.details.spoken_languages
                  .map((l) => l.english_name)
                  .join(", ")}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {info.watchproviders?.flatrate && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-white bg-[#6556CD] px-3 py-1 rounded-full">
                  Stream on
                </span>
                {info.watchproviders.flatrate.map((w, index) => (
                  <img
                    key={index}
                    title={w.provider_name}
                    className="w-10 h-10 object-cover rounded-md hover:scale-110 transition-transform"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={w.provider_name}
                  />
                ))}
              </div>
            )}

            {info.watchproviders?.rent && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-white bg-[#6556CD] px-3 py-1 rounded-full">
                  Rent on
                </span>
                {info.watchproviders.rent.map((w, index) => (
                  <img
                    key={index}
                    title={w.provider_name}
                    className="w-10 h-10 object-cover rounded-md hover:scale-110 transition-transform"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={w.provider_name}
                  />
                ))}
              </div>
            )}

            {info.watchproviders?.buy && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-white bg-[#6556CD] px-3 py-1 rounded-full">
                  Buy on
                </span>
                {info.watchproviders.buy.map((w, index) => (
                  <img
                    key={index}
                    title={w.provider_name}
                    className="w-10 h-10 object-cover rounded-md hover:scale-110 transition-transform"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={w.provider_name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-6 text-center">
          {info.recommendations.length > 0 ? "Recommendations" : "Similar Content"}
        </h2>
        
        {info.recommendations.length > 0 || info.similar.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(info.recommendations.length > 0 ? info.recommendations : info.similar)
              .slice(0, 5).map((data, index) => (
              <Link
                to={`/${data.release_date ? "movie" : "tv"}/details/${data.id}`}
                key={index}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-[#6556CD]/30"
              >
                {data.backdrop_path || data.poster_path ? (
                  <img
                    className="w-full h-40 object-cover"
                    src={`https://image.tmdb.org/t/p/original/${
                      data.backdrop_path || data.poster_path
                    }`}
                    alt={data.title || data.name}
                  />
                ) : (
                  <div className="w-full h-40 bg-zinc-800 flex items-center justify-center text-zinc-400">
                    No image available
                  </div>
                )}
                
                <div className="p-3">
                  <h3 className="text-white font-medium truncate">
                    {data.name || data.title || data.original_name || data.original_title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 mt-1">
                    {data.overview}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-400 py-8">
            No recommendations available
          </div>
        )}
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
