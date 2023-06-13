import styles from "@/styles/MovieCard.module.css";
import { getFilmServicesTmdb, getFilmByIdTmdb } from "api";
import { getOfficialTrailer } from "utils/utils";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

export default function MovieCard({
  isMobile,
  film,
  setFilmClicked,
  genre,
  options,
}) {
  const [serviceIcons, setServiceIcons] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [cardFocused, setCardFocused] = useState(false);
  const [count, setCount] = useState(null);
  const [timer, setTimer] = useState(null);
  const Card = useRef();

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
    if (cardFocused && !isMobile) {
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
        setTrailerPlaying(true);
        console.log("trailer fetched");
      });
    }
  }, [count]);

  useEffect(() => {
    if (trailerPlaying) {
      document.addEventListener("mousedown", closeTrailer);

      return () => {
        document.removeEventListener("mousedown", closeTrailer);
      };
    }
  }, [trailerPlaying]);

  function closeTrailer(e) {
    console.log("clicky");
    if (e.target !== Card) {
      setTrailerPlaying(false);
      setCardFocused(false);
    }
  }

  function handleClick(e) {
    setFilmClicked(true);
  }

  return (
    <>
      {Object.keys(film).length ? (
        <Link
          ref={Card}
          onMouseEnter={() => {
            if (!isMobile) setCardFocused(true);
          }}
          onMouseOut={() => {
            if (count > 0) {
              setCardFocused(false);
              setCount(null);
              clearInterval(timer);
            }
            // if (trailerPlaying) setTrailerPlaying(false);
          }}
          to={`/${film.media_type}/${film.id}`}
          className={clsx(styles.MovieCardLink, {
            [styles.genre]: genre,
            [styles.trailer]: trailerPlaying && trailer,
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
            {trailerPlaying && trailer ? (
              <>
                <div onMouseDown={closeTrailer} className={styles.closeBtn}>
                  <p>X</p>
                </div>
                <iframe
                  // id="ivplayer"
                  className={styles.video}
                  src={trailer}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; autoplay"></iframe>
              </>
            ) : film.poster_path ? (
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
