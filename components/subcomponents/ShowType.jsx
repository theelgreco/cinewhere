import styles from "@/styles/ShowType.module.css";
import clsx from "clsx";
import { useRef } from "react";

export default function ShowType({ handleClick, media_type }) {
  const movies = useRef();
  const tv = useRef();

  function changeClasses(e) {
    if (media_type !== e.target.id) {
      handleClick(e);
    }
  }

  return (
    <div className={styles.flex_row + " " + styles.media}>
      <div
        id="movie"
        ref={movies}
        onClick={changeClasses}
        className={clsx({
          [styles.embossed]: media_type === "movie",
          [styles.engraved]: media_type === "tv",
        })}>
        MOVIES
      </div>
      <div
        id="tv"
        onClick={changeClasses}
        ref={tv}
        className={clsx({
          [styles.embossed]: media_type === "tv",
          [styles.engraved]: media_type === "movie",
        })}>
        TV
      </div>
    </div>
  );
}
