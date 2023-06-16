import styles from "@/styles/Poster.module.css";

export default function Poster({ url, title }) {
  if (url) {
    return (
      <img
        className={styles.moviePoster}
        alt={title}
        src={`https://image.tmdb.org/t/p/w500${url}`}
      />
    );
  } else {
    return (
      <div className={styles.noImage}>
        <p>
          ~<br></br>
          {title}
          <br></br>~
        </p>
      </div>
    );
  }
}
