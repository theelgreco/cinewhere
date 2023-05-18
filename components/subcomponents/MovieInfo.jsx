import styles from "@/styles/MovieInfo.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getFilmByIdTmdb } from "api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo({ country, isMobile }) {
  const { imdb_id, media_type } = useParams();
  const [film, setFilm] = useState(null);
  const [actors, setActors] = useState([]);
  const [streamingServices, setStreamingServices] = useState([]);
  const watchCostTypes = ["flatrate", "free", "ads", "rent", "buy"];

  useEffect(() => {
    console.log(film);
    getFilmByIdTmdb(imdb_id, media_type).then((res) => {
      setFilm(res);
      setStreamingServices(res["watch/providers"].results.GB);
      setActors(res.credits.cast);
    });
  }, []);

  function streamingServicesDOM(services, costs) {
    let dom = [];
    costs.forEach((cost) => {
      if (services[cost]) {
        let arr = [];
        services[cost].forEach((service, index) => {
          arr.push(
            <div
              className={styles.service}
              key={`${service.provider_name}${cost}${index}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${service.logo_path}`}
              />
            </div>
          );
        });
        dom.push({ price: cost, elements: arr });
      }
    });
    return dom;
  }

  if (film) {
    return (
      <div className={styles.expand}>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <Link to={"/"}>
              <button className={styles.backButton}>BACK</button>
            </Link>
            <h1>
              {film.title} ({film.release_date})
            </h1>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
            />
            <section className={styles.servicesSection}>
              <h3>Services</h3>
              {streamingServicesDOM(streamingServices, watchCostTypes).map(
                (price) => {
                  return (
                    <>
                      <p>{price.price}</p>
                      <div className={styles.servicesFlex}>
                        {price.elements}
                      </div>
                    </>
                  );
                }
              )}
            </section>
            <section className={styles.castSection}>
              <h3>Main Cast</h3>
              <div className={styles.castFlex}>
                {film.credits.cast ? (
                  film.credits.cast.map((actor, index) => {
                    return (
                      <div key={actor.name} className={styles.castMember}>
                        <img
                          key={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                          src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}></img>
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
            {film.videos.results.length ? (
              <iframe
                id="video"
                className={styles.video}
                src={`https://www.youtube.com/embed/${film.videos.results[0].key}?loop=1&modestbranding=1`}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
