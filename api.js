import axios from "axios";

const mine = {
  "X-RapidAPI-Key": "120295f81bmshef2922b0bc8ec70p1bf2acjsnf91e520d2110",
  "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
};

const zoes = {
  "X-RapidAPI-Key": "4a3a480da5mshc9cea72feeab0c6p15c1bfjsn3a198667740f",
  "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
};

const filmApi = axios.create({
  baseURL: "https://streaming-availability.p.rapidapi.com/v2",
  // baseURL: "https://api.movieofthenight.com/v2",
});

export const getServiceFilms = (services, country, optionalParams) => {
  let urlString = `/search/basic`;
  let params;
  let servicesString;

  if (services.length === 1) {
    servicesString = services[0];
  } else {
    servicesString = services.join(",");
  }

  if (optionalParams) {
    params = { country: country, services: servicesString, ...optionalParams };
  } else {
    params = { country: country, services: servicesString };
  }

  return filmApi
    .get(urlString, {
      headers: mine,
      params: params,
    })
    .then((res) => {
      console.log(res.data.result);
      return res.data;
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};

export const getFilmById = (id, country) => {
  let urlString = `/get/basic`;

  return filmApi
    .get(urlString, {
      headers: mine,
      params: {
        imdb_id: id,
        country: country,
      },
    })
    .then((res) => {
      return res.data.result;
    });
};

export const searchByTitle = (title, country, optionalParams) => {
  return filmApi
    .get("/search/title", {
      headers: mine,
      params: { title: title, country: country },
    })
    .then((res) => {
      return res.data.result;
    });
};

///////////////////////////TMDB///////////////////////////////////////

const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3" });

const authHeader = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDZjYTEzZGJlYmNiMmIxNGYxNTRjODE0ZTE1NmQ5OSIsInN1YiI6IjY0NWQ0NDQzMTU2Y2M3MDBmZmE5YTFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vMuMXOgxFYgh_viKM6qoUnOX1r9LHXVkb8C_wqedtvs",
};

export const testTmdb = (params) => {

  return tmdb
    .get("/discover/movie", {
      headers: authHeader,
      params: params,
    })
    .then((res) => {
      const movies = res.data.results;
      // movies.forEach((element) => {
      //   getFilmServicesTmdb(element.id).then((res) => {
      //     element.services = res;
      //   });
      // });
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
