import styles from "@/styles/MovieCard.module.css";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MovieInfo from "./MovieInfo";

export default function MovieCard({
  film,
  isMobile,
  noneSelected,
  setNoneSelected,
  isSelected,
  setIsSelected,
  filmFromUrl,
}) {
  const router = useRouter();
  const [fromClick, setFromClick] = useState(null);

  function handleClick(e) {
    if (!isSelected) {
      setFromClick(true);
      setIsSelected(true);
      setNoneSelected(false);
    } else {
      router.replace("/");
      setIsSelected(false);
      setNoneSelected(true);
    }
  }

  return (
    <div
      className={clsx({
        [styles.MovieCard]: (!isMobile && !isSelected) || isMobile,
        [styles.expand]: isSelected,
        [styles.hidden]: !isSelected && !noneSelected,
      })}
      onClick={handleClick}>
      {!isSelected ? (
        <>
          <div className={styles.textBox}>
            <p>{film.title}</p>
          </div>
          <img src={film.posterURLs.original} />
        </>
      ) : (
        <>
          {fromClick ? (
            <MovieInfo film={film} isMobile={isMobile} id={film.title} />
          ) : (
            <MovieInfo film={filmFromUrl} isMobile={isMobile} id={film.title} />
          )}
        </>
      )}
    </div>
  );
}
