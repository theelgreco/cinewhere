import styles from "@/styles/MovieCard.module.css";
import servicesArray from "constants/services";
import { getFilmServicesTmdb } from "api";
import React from "react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

export default function MovieCard({
  film,
  isMobile,
  setFilmClicked,
  genre,
  options
}) {
  const [serviceIcons, setServiceIcons] = useState([]);

  useEffect(() => {

    if (Object.keys(film).length) {
      getFilmServicesTmdb(film.id, film.media_type, options.watch_region).then(
        (res) => {
          if (res) {
            let serviceIconsArray = [];
            if (res.flatrate)
              serviceIconsArray = [...serviceIconsArray, ...res.flatrate];
            if (res.free)
              serviceIconsArray = [...serviceIconsArray, ...res.free];
            if (res.ads) serviceIconsArray = [...serviceIconsArray, ...res.ads];
            if (res.rent)
              serviceIconsArray.push({
                provider_name: "Rent",
                amount: res.rent.length,
              });
            if (res.buy)
              serviceIconsArray.push({
                provider_name: "Buy",
                amount: res.buy.length,
              });
            setServiceIcons(serviceIconsArray);
          } else {
            setServiceIcons([]);
          }
        }
      );
    }
  }, [film]);

  function handleClick(e) {
    setFilmClicked(true);
  }

  return (
    <>
      {Object.keys(film).length ? (
        <Link
          to={`/${film.media_type}/${film.id}`}
          className={clsx(styles.MovieCardLink, {
            [styles.genre]: genre,
          })}
          onClick={handleClick}>
          <div className={styles.MovieCard}>
            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />
            <div className={styles.serviceIcons}>
              {serviceIcons.length ? (
                serviceIcons.map((service, index) => {
                  return (
                    //prettier-ignore
                    <React.Fragment key={`${service.provider_name}${index}${film.title}`}>
                      {service.provider_name === 'Buy' || service.provider_name === 'Rent' 
                        ? <div>
                            <p>{service.provider_name}</p>
                            <p>+{service.amount}</p>
                          </div>
                        : <img src={`https://image.tmdb.org/t/p/w500${service.logo_path}`} /> }
                      
                    </React.Fragment>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div className={styles.MovieCardLinkPreload}></div>
      )}
    </>
  );
}
