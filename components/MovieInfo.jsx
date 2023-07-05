import styles from "@/styles/MovieInfo.module.css";
import React from "react";
import { Link } from "react-router-dom";
import Trailer from "./subcomponents/Trailer";
import { getFilmByIdTmdb } from "api";
import { getOfficialTrailer } from "utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo({ isMobile, options }) {
  const { imdb_id, media_type } = useParams();
  const [film, setFilm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [trailerPlaying, setTrailerPlaying] = useState(true);

  useEffect(() => {
    getFilmByIdTmdb(imdb_id, media_type).then((res) => {
      if (!res) {
        setFilm("doesn't exist");
      } else {
        setFilm(res);
        console.log(res);
        setTrailer(getOfficialTrailer(res));
      }
    });
  }, []);

  function closeTrailer() {
    setTrailerPlaying(false);
  }

  if (film === "doesn't exist") return <h1>BAD LUCK</h1>;
  else if (film) {
    return (
      <section className={styles.topSection}>
        <div className={styles.video}>
          <Trailer
            trailer={trailer}
            trailerPlaying={trailerPlaying}
            autoplay={""}
          />
        </div>
      </section>
    );
  }
}
