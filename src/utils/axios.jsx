import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWIwYmZlZmIzMzBmYjQ0Y2E1MWUyMWU4OGI2OTIxNCIsIm5iZiI6MTczODQxNzE1MC4wOTYsInN1YiI6IjY3OWUyM2ZlZWJiOTk2MjQwMzI2MzI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hlX-23SlQpJ9pR_wx6yPAM1Gd_34FY1XkWsUJ9ZdD6M",
  },
});

export default instance;
