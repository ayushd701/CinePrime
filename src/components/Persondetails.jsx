import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removePerson } from "../store/actions/PersonActions";
import Loading from "./Loading";
import { RiArrowLeftLine, RiHome4Line } from "react-icons/ri";

const Persondetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    if (info && info.details) {
      document.title = `${info.details.name}`;
    }
  }, [info]);

  const [isExpanded, setIsExpanded] = useState(false);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/original/${info.details.profile_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full min-h-screen px-4 md:px-[6%] py-6"
    >
      <nav className="w-full text-zinc-100 flex justify-between items-center h-[10vh] mb-6">
        <div className="flex gap-6 text-2xl md:text-3xl">
          <button
            onClick={() => navigate(-1)}
            className="hover:text-[#587bb4] transition-colors"
          >
            <RiArrowLeftLine />
          </button>
          <Link to="/" className="hover:text-[#587bb4] transition-colors">
            <RiHome4Line />
          </Link>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Profile Image */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] md:h-[70vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt={info.details.name}
          />
        </div>

        <div className="w-full lg:w-2/3 bg-[#2D2B32]/90 p-6 rounded-lg backdrop-blur-sm">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-4">
              {info.details.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-100 mb-6">
              <div>
                {info.details.biography && (
                  <>
                    <h2 className="text-lg font-semibold text-zinc-300 mb-1">
                      Biography
                    </h2>
                    <p className="text-zinc-200 transition-all">
                      {isExpanded
                        ? info.details.biography
                        : `${info.details.biography.slice(0, 150)}...`}
                    </p>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-[#587bb4] hover:underline"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </>
                )}
              </div>

              <div className="space-y-3">
                {info.details.known_for_department && (
                  <div>
                    <span className="font-semibold">Known For : </span>
                    {info.details.known_for_department}
                  </div>
                )}
                {info.details.birthday && (
                  <div>
                    <span className="font-semibold">Birthday : </span>
                    {info.details.birthday}
                  </div>
                )}
                {info.details.place_of_birth && (
                  <div>
                    <span className="font-semibold">Place of Birth : </span>
                    {info.details.place_of_birth}
                  </div>
                )}
                {info.details.gender && (
                  <div>
                    <span className="font-semibold">Gender : </span>
                    {info.details.gender === 2 ? "Male" : "Female"}
                  </div>
                )}
                {info.details.also_known_as?.length > 0 && (
                  <div>
                    <span className="font-semibold">Also Known As : </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {info.details.also_known_as
                        .slice(0, 3)
                        .map((name, index) => (
                          <span
                            key={index}
                            className="bg-zinc-800 px-2 py-1 rounded text-sm"
                          >
                            {name}
                          </span>
                        ))}
                      {info.details.also_known_as.length > 3 && (
                        <span className="bg-zinc-800 px-2 py-1 rounded text-sm">
                          +{info.details.also_known_as.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl text-white font-bold mb-6">Known For</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {(info.combinedCredits.cast || info.combinedCredits.crew)
                .slice(0, 5)
                .map((credit) => (
                  <Link
                    to={`/${credit.media_type}/details/${credit.id}`}
                    key={`${credit.id}-${credit.credit_id || Math.random()}`}
                    className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-[#6556CD]/30"
                  >
                    {credit.poster_path || credit.backdrop_path ? (
                      <img
                        className="w-full h-40 object-cover"
                        src={`https://image.tmdb.org/t/p/original/${
                          credit.poster_path || credit.backdrop_path
                        }`}
                        alt={credit.title || credit.name}
                      />
                    ) : (
                      <div className="w-full h-40 bg-zinc-800 flex items-center justify-center text-zinc-400">
                        No image available
                      </div>
                    )}

                    <div className="p-3">
                      <h3 className="text-white font-medium truncate">
                        {credit.title || credit.name}
                      </h3>
                      <p className="text-zinc-400 text-sm mt-1 truncate">
                        {credit.character && `as ${credit.character}`}
                        {credit.job && credit.job}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;
