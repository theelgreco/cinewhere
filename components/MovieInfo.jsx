import styles from "@/styles/MovieInfo.module.css";
import React from "react";
import { Link } from "react-router-dom";
import Trailer from "./subcomponents/Trailer";
import Poster from "./subcomponents/Poster";
import { getFilmByIdTmdb } from "api";
import { getOfficialTrailer } from "utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo({ isMobile, options }) {
  const { imdb_id, media_type } = useParams();
  const [film, setFilm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [trailerPlaying, setTrailerPlaying] = useState(true);

  useEffect(() => {
    getFilmByIdTmdb(imdb_id, media_type).then((res) => {
      if (!res) {
        setFilm("doesn't exist");
      } else {
        setFilm(res);
        console.log(res);
        setTrailer(getOfficialTrailer(res));
      }
    });
  }, []);

  function closeTrailer() {
    setTrailerPlaying(false);
  }

  if (film === "doesn't exist") return <h1>BAD LUCK</h1>;
  else if (film) {
    return (
      <main className={styles.main}>
        <div className={styles.backdrop}>
          <Poster
            url={film.backdrop_path}
            quality={"original"}
            title={film.title || film.name}
          />
        </div>
        <div className={styles.column + " " + styles.first}>
          <div className={styles.poster}>
            <Poster
              url={film.poster_path}
              quality={"w500"}
              title={film.title || film.name}
            />
          </div>
          <p>{film.title || film.name}</p>
          <p>
            {media_type === "movie" ? (
              <>
                <span>{film.release_date.split("-")[0]}</span>{" "}
                <span>{film.runtime + " mins"}</span>
              </>
            ) : (
              <>
                <span>{film.first_air_date.split("-")[0]}</span>{" "}
                <span>{film.seasons.length} Seasons</span>
              </>
            )}
          </p>
        </div>
        <div className={styles.column}>
          <div className={styles.video}>
            <Trailer trailer={trailer} autoplay={""} trailerPlaying={true} />
          </div>
          <div className={styles.round_tags + " " + styles.description}>
            <p>Description</p>
            <img src="/svg/down_arrow.svg" />
          </div>
        </div>
      </main>
    );
  }
}
