import styles from "@/styles/ShowType.module.css";
import clsx from "clsx";
import { useRef } from "react";

export default function ShowType({ handleClick, media_type }) {
  const movies = useRef();
  const tv = useRef();

  function changeClasses(e) {
    if (media_type !== e.target.id) {
      handleClick(e);
      const classes = {
        [styles.engraved]: styles.embossed,
        [styles.embossed]: styles.engraved,
      };

      tv.current.classList.replace(
        tv.current.classList.value,
        classes[tv.current.classList.value]
      );

      movies.current.classList.replace(
        movies.current.classList.value,
        classes[movies.current.classList.value]
      );
    }
  }

  return (
    <div className={styles.flex_row + " " + styles.media}>
      <div
        id="movie"
        ref={movies}
        onClick={changeClasses}
        className={styles.embossed}>
        MOVIES
      </div>
      <div id="tv" onClick={changeClasses} ref={tv} className={styles.engraved}>
        TV
      </div>
    </div>
  );
}
