import axios from "axios";

///////////////////////////TMDB///////////////////////////////////////

const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3" });

const authHeader = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDZjYTEzZGJlYmNiMmIxNGYxNTRjODE0ZTE1NmQ5OSIsInN1YiI6IjY0NWQ0NDQzMTU2Y2M3MDBmZmE5YTFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vMuMXOgxFYgh_viKM6qoUnOX1r9LHXVkb8C_wqedtvs",
};

export const getFilmsTmdb = (params, media_type) => {
  console.log(params);
  return tmdb
    .get(`/discover/${media_type}`, {
      headers: authHeader,
      params: params,
    })
    .then((res) => {
      const movies = res.data.results;
      movies.map((movie) => {
        return (movie.media_type = media_type);
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
      console.log(res.data);
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

export const getRegions = () => {
  return tmdb
    .get("/watch/providers/regions", { headers: authHeader })
    .then((res) => {
      return res.data.results.sort((a, b) =>
        a.english_name.localeCompare(b.english_name)
      );
    });
};

export const getLanguages = () => {
  return tmdb
    .get("/configuration/languages", { headers: authHeader })
    .then((res) => {
      const sortedLanguages = res.data.sort((a, b) =>
        a.iso_639_1.localeCompare(b.iso_639_1)
      );
      const formattedLanguages = sortedLanguages.map((lang) => {
        return lang.name
          ? { iso_639_1: lang.iso_639_1, name: lang.name }
          : { iso_639_1: lang.iso_639_1, name: lang.english_name };
      });
      return [{ iso_639_1: "", name: "ALL LANGUAGES" }, ...formattedLanguages];
    });
};

export const getLowestMovieYear = (params) => {
  return tmdb
    .get(`/discover/movie`, {
      headers: authHeader,
      params: params,
    })
    .then((res) => {
      return res.data.results[0].release_date.split("-")[0];
    })
    .catch((err) => {
      if (err) console.error(err);
    });
};
