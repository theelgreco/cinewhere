import styles from "@/styles/MovieInfo.module.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { getFilmByIdTmdb } from "api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo({ isMobile }) {
  const { imdb_id, media_type } = useParams();
  const [film, setFilm] = useState(null);
  const [actors, setActors] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [streamingServices, setStreamingServices] = useState([]);
  const watchCostTypes = ["flatrate", "free", "ads", "rent", "buy"];

  useEffect(() => {
    getFilmByIdTmdb(imdb_id, media_type).then((res) => {
      setFilm(res);
      setStreamingServices(res["watch/providers"].results.GB);
      setActors(res.credits.cast);

      console.log(res);
      let regex = /Official Trailer/i;
      let trailer = res.videos.results.find((el) => regex.test(el.name));
      if (!trailer)
        trailer = res.videos.results.find((el) => el.type === "Trailer");
      if (trailer) {
        setTrailer(`https://yewtu.be/embed/${trailer.key}`);
      }
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
              {media_type === "movie"
                ? `${film.title} (${film.release_date})`
                : `${film.name} (${film.first_air_date})`}
            </h1>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
            />
            <section className={styles.servicesSection}>
              <h3>Services</h3>
              {streamingServicesDOM(streamingServices, watchCostTypes).map(
                (price, index) => {
                  return (
                    <React.Fragment key={`${index}${price}`}>
                      <p>{price.price}</p>
                      <div className={styles.servicesFlex}>
                        {price.elements}
                      </div>
                    </React.Fragment>
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
            {trailer ? (
              <iframe
                // id="ivplayer"
                className={styles.video}
                src={trailer}
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
