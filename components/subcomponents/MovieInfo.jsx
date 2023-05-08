import styles from "@/styles/MovieInfo.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getFilmById } from "api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo({ isMobile }) {
  const { imdb_id } = useParams();
  const [film, setFilm] = useState(null);
  const [actors, setActors] = useState([]);
  const [streamingServices, setStreamingServices] = useState([]);

  useEffect(() => {
    console.log(imdb_id);
    getFilmById(imdb_id).then((res) => {
      setFilm(res);
    });
  }, []);

  useEffect(() => {
    if (film) {
      const arr = [];
      film.cast.forEach((actor) => {
        const split = actor.split(" ");
        const formatted = split[0] + "+" + split[1];
        arr.push(formatted);
      });
      const joined = arr.join("&");

      axios
        .get(`https://getgglimg.onrender.com/${joined}`)
        .then((res) => {
          setActors(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      if (film.streamingInfo.gb) {
        setStreamingServices(Object.keys(film.streamingInfo.gb));
      }
    }
  }, [film]);

  if (film) {
    return (
      <div className={styles.expand}>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <Link to={"/"}>
              <button className={styles.backButton}>BACK</button>
            </Link>
            <h1>{film.title}</h1>
            <img className={styles.poster} src={film.posterURLs.original} />
            <section className={styles.servicesSection}>
              <h3>Services</h3>
              <div className={styles.servicesFlex}>
                {streamingServices.map((service, index) => {
                  return (
                    <div className={styles.service} key={index}>
                      <p>{service}</p>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className={styles.castSection}>
              <h3>Main Cast</h3>
              <div className={styles.castFlex}>
                {actors ? (
                  actors.map((actor, index) => {
                    return (
                      <div key={index} className={styles.castMember}>
                        <img key={actor.image} src={actor.image}></img>
                        <p key={actor.name} className={styles.names}>
                          {actor.name}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </section>
            <p className={styles.overview}>{film.overview}</p>
          </div>

          <div className={styles.videoContainer}>
            <iframe
              id="video"
              className={styles.video}
              src={`https://www.youtube.com/embed/${film.youtubeTrailerVideoId}?loop=1&modestbranding=1`}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
