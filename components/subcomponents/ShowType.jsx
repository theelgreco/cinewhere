import styles from "@/styles/ShowType.module.css";
import clsx from "clsx";

export default function ShowType({ handleClick, media_type }) {
  return (
    <div className={styles.flex_row + " " + styles.media}>
      <div
        id="tv"
        onClick={handleClick}
        className={clsx(styles.buttonChoices, {
          [styles.selected]: media_type === "tv",
        })}>
        TV
      </div>
      <div
        id="movie"
        onClick={handleClick}
        className={clsx(styles.buttonChoices, {
          [styles.selected]: media_type === "movie",
        })}>
        MOVIES
      </div>
    </div>
  );
}
