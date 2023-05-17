import axios from "axios";

///////////////////////////TMDB///////////////////////////////////////

const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3" });

const authHeader = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDZjYTEzZGJlYmNiMmIxNGYxNTRjODE0ZTE1NmQ5OSIsInN1YiI6IjY0NWQ0NDQzMTU2Y2M3MDBmZmE5YTFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vMuMXOgxFYgh_viKM6qoUnOX1r9LHXVkb8C_wqedtvs",
};

export const getFilmsTmdb = (params) => {
  return tmdb
    .get("/discover/movie", {
      headers: authHeader,
      params: params,
    })
    .then((res) => {
      const movies = res.data.results;
      movies.map((movie) => {
        return (movie.media_type = "movie");
      });
      return movies;
    })
    .catch((err) => {
      if (err) console.error(err);
    });
};

export const getFilmServicesTmdb = (movie_id, media) => {
  return tmdb
    .get(`/${media}/${movie_id}/watch/providers`, {
      headers: authHeader,
    })
    .then((res) => {
      return res.data.results.GB;
    })
    .catch((err) => {
      if (err) console.error(err);
    });
};

export const getFilmByIdTmdb = (movie_id, media) => {
  return tmdb
    .get(`/${media}/${movie_id}`, {
      headers: authHeader,
      params: { append_to_response: "watch/providers,videos,credits" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err) console.error(err);
    });
};

export const searchMovies = (params) => {
  return tmdb
    .get("/search/multi", {
      headers: authHeader,
      params: params,
    })
    .then((res) => {
      let movies = [];
      res.data.results.map((result) => {
        if (result.media_type === "person") {
          result.known_for.forEach((element) => {
            movies.push(element);
          });
        } else {
          movies.push(result);
        }
      });
      return movies;
    })
    .catch((err) => {
      if (err) console.error(err);
    });
};
