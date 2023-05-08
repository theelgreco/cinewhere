import styles from "@/styles/MovieCard.module.css";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

export default function MovieCard({
  film,
  isMobile,
  setFilmClicked,
  scrollHeight,
  sectionRef,
}) {
  function handleClick(e) {
    setFilmClicked(true);
    scrollHeight.current = sectionRef.current.scrollTop;
    console.log(sectionRef.current.scrollTop);
  }

  return (
    <Link
      to={`/movies/${film.imdbId}`}
      className={styles.MovieCardLink}
      onClick={handleClick}>
      <div className={styles.MovieCard}>
        <div className={styles.textBox}>
          <p>{film.title}</p>
        </div>
        <img src={film.posterURLs.original} />
      </div>
    </Link>
  );
}
