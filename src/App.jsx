import "./App.css";
import {
  Home,
  Trending,
  Popular,
  Movies,
  Tv_Shows,
  People,
  About,
  Contact,
  Moviedetails,
  Tvdetails,
  Persondetails,
  Notfound,
} from "./components/index";
import { Trailer } from "./components/partials/partial";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-[#1F1E24] w-full h-full flex">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movies />}></Route>
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route
            path="/movie/details/:id/trailer"
            element={<Trailer />}
          ></Route>
        </Route>
        <Route path="/tv" element={<Tv_Shows />}></Route>
        <Route path="/tv/details/:id" element={<Tvdetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />}></Route>
        </Route>
        <Route path="/person" element={<People />}></Route>
        <Route path="/person/details/:id" element={<Persondetails />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
