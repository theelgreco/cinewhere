import styles from "@/styles/MovieInfo.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { getFilmByIdTmdb } from "api";
import { getOfficialTrailer } from "utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieInfo({ isMobile, options }) {
  const { imdb_id, media_type } = useParams();
  const [film, setFilm] = useState(null);
  const [actors, setActors] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [streamingServices, setStreamingServices] = useState(null);
  const watchCostTypes = ["flatrate", "free", "ads", "rent", "buy"];

  useEffect(() => {
    getFilmByIdTmdb(imdb_id, media_type).then((res) => {
      if (!res) {
        setFilm("doesn't exist");
        return;
      }

      setFilm(res);
      console.log(res);
      const tempServices = res["watch/providers"].results[options.watch_region];
      if (tempServices) setStreamingServices(tempServices);

      setActors(res.credits.cast);
      setTrailer(getOfficialTrailer(res));
    });
  }, []);

  //refactor this!!!
  function streamingServicesDOM(services, costs) {
    let dom = [];
    if (services) {
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
    }
    return dom;
  }

  if (film === "doesn't exist") return <h1>BAD LUCK</h1>;
  else if (film) {
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
