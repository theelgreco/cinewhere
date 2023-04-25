import styles from "@/styles/MovieInfo.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MovieInfo({ film, isMobile }) {
  const [actors, setActors] = useState([]);
  const [streamingServices, setStreamingServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/") {
      //   router.replace(`/#${film.imdbId}`);
    }

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
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>{film.title}</h1>
        {/* <img className={styles.poster} src={film.posterURLs.original} /> */}
        <section className={styles.servicesSection}>
          <h3>Services</h3>
          <div className={styles.servicesFlex}>
            {streamingServices.map((service) => {
              return (
                <div className={styles.service}>
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
              actors.map((actor) => {
                return (
                  <div className={styles.castMember}>
                    <img src={actor.image}></img>
                    <p className={styles.names}>{actor.name}</p>
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
  );
}
