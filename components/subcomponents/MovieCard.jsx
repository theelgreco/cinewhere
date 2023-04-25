import styles from "@/styles/MovieCard.module.css";
import { clsx } from "clsx";
import { useRouter } from "next/router";

export default function MovieCard({
  film,
  isMobile,
  setSingleFilm,
}) {
  const router = useRouter();

  function handleClick(e) {
    setSingleFilm(film);
    router.push(`/home/#${film.imdbId}`);
  }

  return (
    <div className={styles.MovieCard} onClick={handleClick}>
      <div className={styles.textBox}>
        <p>{film.title}</p>
      </div>
      <img src={film.posterURLs.original} />
    </div>
  );

}
