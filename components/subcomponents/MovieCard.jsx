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
    getFilmServicesTmdb(film.id).then((res) => {
      if (res) {
        if (res.flatrate) setServiceIcons(res.flatrate);
      }
    });
  }, []);

  function handleClick(e) {
    setFilmClicked(true);
  }

  return (
    <Link
      to={`/movies/${film.id}`}
      className={clsx({
        [styles.MovieCardLink]: genre || !genre,
        [styles.genre]: genre,
      })}
      onClick={handleClick}>
      <div className={styles.MovieCard}>
        <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} />
        <div className={styles.serviceIcons}>
          {serviceIcons.length ? (
            serviceIcons.map((service, index) => {
              return (
                //prettier-ignore
                <React.Fragment key={`${service.provider_name}${index}${film.title}`}>
                  <img src={`https://image.tmdb.org/t/p/original${service.logo_path}`} />
                </React.Fragment>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </Link>
  );
}
