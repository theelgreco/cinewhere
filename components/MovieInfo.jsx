import styles from "@/styles/MovieInfo.module.css";
import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Trailer from "./subcomponents/Trailer";
import Poster from "./subcomponents/Poster";
import ServicesTable from "./subcomponents/ServicesTable";
import { getFilmByIdTmdb } from "api";
import { getOfficialTrailer } from "utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo({ isMobile, options, region }) {
  const { imdb_id, media_type } = useParams();
  const [film, setFilm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [layout, setLayout] = useState(updateLayout(window.innerWidth));

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

    window.addEventListener("resize", () => {
      setLayout(updateLayout(window.innerWidth));
    });

    return () => {
      window.removeEventListener("resize", () => {
        setLayout(updateLayout(window.innerWidth));
      });
    };
  }, []);

  function updateLayout(width) {
    if (width < 710) {
      return 2;
    } else {
      return 1;
    }
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
        <div className={styles.column + " " + styles.container}>
          <div className={styles.row + " " + styles.content}>
            <div className={styles.column + " " + styles.first}>
              <div className={styles.column + " " + styles.info}>
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
                      <span>{film.release_date.split("-")[0]}</span>
                      <span className={styles.circle}></span>
                      <span>{film.runtime + " mins"}</span>
                    </>
                  ) : (
                    <>
                      <span>{film.first_air_date.split("-")[0]}</span>
                      <span className={styles.circle}></span>
                      <span>{film.seasons.length} Seasons</span>
                    </>
                  )}
                </p>
                <div
                  className={
                    styles.row + " " + styles.wrap + " " + styles.genreList
                  }>
                  {film.genres.map((genre) => {
                    return (
                      <div
                        key={genre.name}
                        className={styles.round_tags + " " + styles.genre}>
                        {genre.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              {layout === 2 ? (
                <div className={styles.column + " " + styles.cast}>
                  <h3>Cast</h3>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.column + " " + styles.second}>
              <div className={styles.video}>
                <Trailer trailer={trailer} trailerPlaying={true} />
              </div>
              <div className={styles.round_tags + " " + styles.description}>
                <p>Description</p>
                <img src="/svg/down_arrow.svg" />
              </div>
            </div>
            {layout === 2 ? (
              <div className={styles.column + " " + styles.services}>
                <ServicesTable
                  services={film["watch/providers"]["results"][region]}
                  filmTitle={film.title || film.name}
                  region={region}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          {layout === 1 ? (
            <>
              <div className={styles.column + " " + styles.services}>
                <h3>Where to watch</h3>
                <ServicesTable
                  services={film["watch/providers"]["results"][region]}
                  filmTitle={film.title || film.name}
                  region={region}
                />
              </div>
              <div className={styles.column + " " + styles.cast}>
                <h3>Cast</h3>
                <div className={styles.wrapper}>
                  <div className={styles.flex}></div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </main>
    );
  }
}
