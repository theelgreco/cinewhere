import axios from "axios";

///////////////////////////TMDB///////////////////////////////////////

const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3" });

const authHeader = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDZjYTEzZGJlYmNiMmIxNGYxNTRjODE0ZTE1NmQ5OSIsInN1YiI6IjY0NWQ0NDQzMTU2Y2M3MDBmZmE5YTFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vMuMXOgxFYgh_viKM6qoUnOX1r9LHXVkb8C_wqedtvs",
};

export const testTmdb = (params) => {
  console.log(params);

  return tmdb
    .get("/discover/movie", {
      headers: authHeader,
      params: params,
    })
    .then((res) => {
      const movies = res.data.results;
      return movies;
    });
};

export const getFilmServicesTmdb = (movie_id) => {
  return tmdb
    .get(`/movie/${movie_id}/watch/providers`, {
      headers: authHeader,
    })
    .then((res) => {
      return res.data.results.GB;
    });
};

export const getFilmByIdTmdb = (movie_id) => {
  return tmdb
    .get(`/movie/${movie_id}`, {
      headers: authHeader,
      params: { append_to_response: "watch/providers,videos,credits" },
    })
    .then((res) => {
      return res.data;
    });
};

export const searchMovies = (params) => {
  return tmdb
    .get("/search/movie", {
      headers: authHeader,
      params: params,
    })
    .then((res) => {
      console.log(res);
      return res.data.results;
    });
};
