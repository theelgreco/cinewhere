import InfoContainer from "./InfoContainer";
import ServiceIcons from "./ServiceIcons";
import Countdown from "./Countdown";
import Poster from "./Poster";
import Trailer from "./Trailer";
import styles from "@/styles/MovieCard.module.css";
import { getFilmServicesTmdb, getFilmByIdTmdb } from "api";
import { getOfficialTrailer } from "utils/utils";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";
import { getAllDescendantElements } from "utils/utils";

export default function MovieCard({
  isMobile,
  film,
  setFilmClicked,
  genre,
  options,
  settings,
  rowsObject,
  trailerRow,
  setTrailerRow,
}) {
  const [serviceIcons, setServiceIcons] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [cardFocused, setCardFocused] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [preCardHovered, setPreCardHovered] = useState(false);
  const [count, setCount] = useState(null);
  const [timer, setTimer] = useState(null);
  const [startTimer, setStartTimer] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [playButtonClick, setPlayButtonClick] = useState(false);
  let prevTouch;
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
    if (cardFocused && settings?.autoplay && !isMobile) {
      setTimeout(() => {
        setStartTimer(true);
      }, 2000);
    } else {
      setStartTimer(null);
    }

    if (cardFocused && isMobile) {
      document.addEventListener("touchstart", handleTouchWhileFocused);
    }
  }, [cardFocused]);

  useEffect(() => {
    if (startTimer && cardFocused) {
      let counter = 3;
      setCount(counter);
      setTimer(
        setInterval(() => {
          counter--;
          setCount(counter);
        }, 1000)
      );
    }
  }, [startTimer]);

  useEffect(() => {
    if (count === 0 || playButtonClick) {
      setCardFocused(false);
      setPlayButtonClick(false);
      setCount(null);
      setStartTimer(null);
      clearInterval(timer);

      if (trailer) {
        setTrailerPlaying(true);
        !genre ? setTrailerRow(rowsObject[film.id]) : null;
      }

      if (!trailer) {
        getFilmByIdTmdb(film.id, film.media_type).then((res) => {
          const getTrailer = getOfficialTrailer(res);

          if (getTrailer) {
            setTrailer(getOfficialTrailer(res));
            setTrailerPlaying(true);
            !genre ? setTrailerRow(rowsObject[film.id]) : null;
          } else {
            return;
          }
        });
      }
    }
  }, [count, playButtonClick]);

  useEffect(() => {
    if (trailerPlaying) {
      document.addEventListener("mousedown", closeTrailer);

      if (genre) {
        const cardLeft = Card.current.offsetLeft;
        const flexContainer = Card.current.parentElement;

        flexContainer.scrollTo({
          left: cardLeft - 5,
          behavior: "smooth",
        });
      } else {
        const cardTop = Card.current.offsetTop;
        const flexContainer = Card.current.parentElement.parentElement;

        flexContainer.scrollTo({
          top: cardTop + 30,
          behavior: "smooth",
        });
      }

      return () => {
        document.removeEventListener("mousedown", closeTrailer);
      };
    }
  }, [trailerPlaying]);

  useEffect(() => {
    if (rowsObject) {
      setCurrentRow(rowsObject[film.id]);
    }

    if (trailer && trailerPlaying) {
      setTrailerRow(rowsObject[film.id]);
    }
  }, [rowsObject]);

  useEffect(() => {
    if (preCardHovered) {
      // setCardFocused(true);
      setPreCardHovered(false);
      document.removeEventListener("touchend", handleTouchWhileHovered);
      document.removeEventListener("touchmove", handleTouchMove);
    } else {
      setCardHovered(false);
      setPreCardHovered(false);
      document.removeEventListener("touchend", handleTouchWhileHovered);
      document.removeEventListener("touchmove", handleTouchMove);
    }
  }, [cardHovered]);

  function closeTrailer(e) {
    if (e.target !== Card.current) {
      setTrailerPlaying(false);
      setCardFocused(false);
      setStartTimer(null);
      if (!genre) setTrailerRow(null);
    }
  }

  //remember to set film clicked when going to individual film page
  function handleClick(e) {
    setFilmClicked(true);
    if (e.touches) {
      setTimeout(() => {
        setCardFocused(false);
        setPreCardHovered(false);
        setCardHovered(false);
        document.removeEventListener("touchstart", handleTouchWhileFocused);
        document.removeEventListener("touchend", handleTouchWhileHovered);
        document.removeEventListener("touchmove", handleTouchMove);
      }, 4);
    }
  }

  /* Touch event handler callbacks */

  function handleTouchWhileFocused(e) {
    if (!Card.current) return;
    let descendants = getAllDescendantElements(Card.current, []);

    if (e.target !== Card.current && !descendants.includes(e.target)) {
      setCardFocused(false);
      document.removeEventListener("touchstart", handleTouchWhileFocused);
    }
  }

  function handleTouchWhileHovered(e) {
    const touch = e.changedTouches[0];
    const targetElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );

    if (targetElement === Card.current) {
      setTimeout(() => {
        setCardFocused(true);
      }, 200);
    }

    setPreCardHovered(false);
    setCardHovered(false);
    document.removeEventListener("touchend", handleTouchWhileHovered);
    document.removeEventListener("touchmove", handleTouchMove);
  }

  function handleTouchMove(e) {
    const touch = e.changedTouches[0];
    const currY = touch.pageY;
    let diff = Math.abs(prevTouch - currY);
    if (diff > 1) {
      setCardFocused(false);
      setCardHovered(false);
      setPreCardHovered(false);
      document.removeEventListener("touchend", handleTouchWhileHovered);
      document.removeEventListener("touchmove", handleTouchMove);
    }
  }

  return (
    <>
      {Object.keys(film).length ? (
        <div
          title={film.title}
          ref={Card}
          onTouchStart={(e) => {
            if (!cardFocused && !trailerPlaying) {
              setPreCardHovered(true);
              setTimeout(() => {
                setCardHovered(true);
              }, 200);
              prevTouch = e.touches[0].pageY;
              document.addEventListener("touchend", handleTouchWhileHovered);
              document.addEventListener("touchmove", handleTouchMove);
            }
          }}
          onMouseOver={() => {
            setCardFocused(true);
          }}
          onMouseLeave={() => {
            setCardFocused(false);
            setCount(null);
            setStartTimer(null);
            clearInterval(timer);
          }}
          className={clsx(styles.MovieCardLink, {
            [styles.focused]: cardFocused || (cardHovered && !preCardHovered),
            [styles.genre]: genre,
            [styles.trailer]: trailerPlaying && trailer,
            [styles.row]:
              currentRow && trailerRow === currentRow && !trailerPlaying,
          })}
          // onClick={handleClick}
        >
          <div className={styles.MovieCard}>
            {!trailerPlaying ? (
              <>
                <Countdown count={count} />
                <Poster
                  url={film.poster_path || null}
                  title={film.title || film.name}
                  quality={"w500"}
                />
                <ServiceIcons
                  serviceIcons={serviceIcons}
                  filmTitle={film.title || film.name}
                  region={options.watch_region}
                />
                <InfoContainer
                  isMobile={isMobile}
                  cardFocused={cardFocused}
                  id={film.id}
                  media_type={film.media_type}
                  setPlayButtonClick={setPlayButtonClick}
                  handleClick={handleClick}
                />
              </>
            ) : (
              <>
                <div
                  onTouchEnd={closeTrailer}
                  onMouseDown={closeTrailer}
                  className={styles.closeBtn}>
                  <p>X</p>
                </div>
                <Trailer
                  trailerPlaying={trailerPlaying}
                  trailer={trailer}
                  autoplay={"autoplay"}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={clsx({
            [styles.MovieCardLinkPreload]: !genre,
            [styles.MovieCardLinkPreloadGenre]: genre,
          })}></div>
      )}
    </>
  );
}
