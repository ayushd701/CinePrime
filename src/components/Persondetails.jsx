import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadperson, removePerson } from "../store/actions/PersonActions";
import Loading from "./Loading";
import wikipedia from "/wikipedia.png";
import facebook from "/facebook.png";
import instagram from "/instagram.jpg";
import twitter from "/twitter.png";

const Persondetails = () => {
  const loca = useLocation();
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
  console.log(info);

  useEffect(() => {
    if (info && info.details) {
      document.title = `${info.details.name}`;
    }
  }, [info]);
  return info ? (
    <div className="w-screen px-[8%] flex flex-col h-[100%] bg-[#1F1E24] mb-[1vh]">
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
      </nav>
      {/* Part 2  */}

      <div className="w-full flex flex-row mt-[1%]">
        {/* {Part 2 Left poster } */}
        <div className="w-[30%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${
              info.details.poster_path ||
              info.details.backdrop_path ||
              info.details.profile_path
            }`}
            alt=""
          />
          <hr className="mt-10 border-none h-[2px] bg-zinc-500 w-[70%]" />
          <div className="flex gap-x-8 p-5 ">
            {info.externalid.wikidata_id && <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <img className="w-[4vh] rounded-md" src={wikipedia} alt="" />
            </a>}
            {info.externalid.facebook_id && <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <img className="w-[4vh] rounded-md" src={facebook} alt="" />
            </a>}
            {info.externalid.instagram_id && <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <img className="w-[4vh] rounded-md" src={instagram} alt="" />
            </a>}
            {info.externalid.twitter_id && <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <img className="w-[4vh] rounded-md" src={twitter} alt="" />
            </a>}
          </div>
          <h1 className="text-2xl text-zinc-400">Personal Information</h1>
          {info.details.known_for_department && (
            <h1 className=" text-zinc-400 mt-5">
              Known For : {info.details.known_for_department}{" "}
            </h1>
          )}
          {info.details.birthday && (
            <h1 className=" text-zinc-400 mt-1">
              Birthday : {info.details.birthday}{" "}
            </h1>
          )}
          {info.details.place_of_birth && (
            <h1 className=" text-zinc-400 mt-1">
              Place of birth : {info.details.place_of_birth}{" "}
            </h1>
          )}
          {info.details.gender && (
            <h1 className=" text-zinc-400 mt-1">
              Gender : {info.details.gender === 2 ? "Male" : "Female"}{" "}
            </h1>
          )}
          {info.details.also_known_as && (
            <h1 className=" text-zinc-400 mt-1">
              Also known as : {info.details.also_known_as.join(" , ")}{" "}
            </h1>
          )}
        </div>
        {/* {Part 2 Right details} */}
        <div className="w-[70%]">
          <h1 className="text-6xl text-zinc-400 font-black">
            {info.details.name}
          </h1>
          {info.details.biography !== "" && (
            <h1 className="text-xl text-zinc-400 mt-5 ">
              Biography :{" "}
              <p className="text-sm mt-2">{info.details.biography}</p>
            </h1>
          )}
          <h1 className="text-xl text-zinc-400 mt-20 ">Known For :</h1>
          <div className="w-[100%] h-[35%] flex overflow-y-hidden">
            { ( info.combinedCredits.cast || info.combinedCredits.crew).map((data, index) => (
              <Link
                to={`/${data.media_type}/details/${data.id}`}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;

{
  /* <div className="flex  gap-x-10 p-5">
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
            </div> */
}
