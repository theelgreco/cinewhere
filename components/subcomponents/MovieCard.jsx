import styles from "@/styles/MovieCard.module.css";
import servicesArray from "constants/services";
import { getFilmServicesTmdb, getFilmByIdTmdb } from "api";
import { getOfficialTrailer } from "utils/utils";
import React from "react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

export default function MovieCard({
  film,
  isMobile,
  setFilmClicked,
  genre,
  options,
}) {
  const [serviceIcons, setServiceIcons] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [cardFocused, setCardFocused] = useState(false);
  const [count, setCount] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (Object.keys(film).length) {
      getFilmServicesTmdb(film.id, film.media_type, options.watch_region).then(
        (res) => {
          if (res) {
            let serviceIconsArray = [];
            if (res.flatrate)
              serviceIconsArray = [...serviceIconsArray, ...res.flatrate];
            if (res.free)
              serviceIconsArray = [...serviceIconsArray, ...res.free];
            if (res.ads) serviceIconsArray = [...serviceIconsArray, ...res.ads];
            if (res.rent)
              serviceIconsArray.push({
                provider_name: "Rent",
                amount: res.rent.length,
              });
            if (res.buy)
              serviceIconsArray.push({
                provider_name: "Buy",
                amount: res.buy.length,
              });
            setServiceIcons(serviceIconsArray);
          } else {
            setServiceIcons([]);
          }
        }
      );
    }
  }, [film]);

  useEffect(() => {
    if (cardFocused) {
      let counter = 3;
      setCount(counter);
      setTimer(
        setInterval(() => {
          counter--;
          setCount(counter);
        }, 1000)
      );
    }
  }, [cardFocused]);

  useEffect(() => {
    if (count === 0) {
      setCardFocused(false);
      setCount(null);
      clearInterval(timer);

      console.log("finished");

      getFilmByIdTmdb(film.id, film.media_type).then((res) => {
        setTrailer(getOfficialTrailer(res));
        console.log("trailer fetched");
      });
    }
  }, [count]);

  function handleClick(e) {
    setFilmClicked(true);
  }

  return (
    <>
      {Object.keys(film).length ? (
        <Link
          onMouseEnter={() => {
            setCardFocused(true);
          }}
          onMouseOut={() => {
            if (count > 0) {
              setCardFocused(false);
              setCount(null);
              clearInterval(timer);
            }
          }}
          to={`/${film.media_type}/${film.id}`}
          className={clsx(styles.MovieCardLink, {
            [styles.genre]: genre,
          })}
          onClick={handleClick}>
          <div className={styles.MovieCard}>
            {count !== null && count < 4 ? (
              <div className={styles.countdownContainer}>
                <p className={styles.countdownText}>{count}</p>
              </div>
            ) : (
              <></>
            )}
            {film.poster_path ? (
              <img
                className={styles.moviePoster}
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              />
            ) : (
              <div className={styles.noImage}>
                <p>
                  ~<br></br>
                  {film.title ? film.title : film.name}
                  <br></br>~
                </p>
              </div>
            )}
            <div className={styles.serviceIcons}>
              {serviceIcons.length ? (
                serviceIcons.map((service, index) => {
                  return (
                    //prettier-ignore
                    <React.Fragment key={`${service.provider_name}${index}${film.title}`}>
                      {service.provider_name === 'Buy' || service.provider_name === 'Rent' 
                        ? <div>
                            <p>{service.provider_name}</p>
                            <p>+{service.amount}</p>
                          </div>
                        : <img src={`https://image.tmdb.org/t/p/w500${service.logo_path}`} /> }
                      
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
