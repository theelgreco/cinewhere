import styles from "@/styles/MovieCard.module.css";
import servicesArray from "constants/services";
import { getFilmServicesTmdb } from "api";
import React from "react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

export default function MovieCard({
  film,
  isMobile,
  setFilmClicked,
  genre,
  data,
  country,
}) {
  const [serviceIcons, setServiceIcons] = useState([]);

  useEffect(() => {
    console.log(film);

    if (Object.keys(film).length) {
      getFilmServicesTmdb(film.id, film.media_type).then((res) => {
        if (res) {
          if (res.flatrate) setServiceIcons(res.flatrate);
        } else {
          setServiceIcons([]);
        }
      });
    }
  }, [film]);

  function handleClick(e) {
    setFilmClicked(true);
  }

  return (
    <>
      {Object.keys(film).length ? (
        <Link
          to={`/${film.media_type}/${film.id}`}
          className={clsx(styles.MovieCardLink, {
            [styles.genre]: genre,
          })}
          onClick={handleClick}>
          <div className={styles.MovieCard}>
            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />
            <div className={styles.serviceIcons}>
              {serviceIcons.length ? (
                serviceIcons.map((service, index) => {
                  return (
                    //prettier-ignore
                    <React.Fragment key={`${service.provider_name}${index}${film.title}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${service.logo_path}`} />
                </React.Fragment>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div className={styles.MovieCardLinkPreload}></div>
      )}
    </>
  );
}
