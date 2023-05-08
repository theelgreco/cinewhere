import styles from "@/styles/MovieCard.module.css";
import servicesArray from "constants/services";
import React from "react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

export default function MovieCard({
  film,
  isMobile,
  setFilmClicked,
  scrollHeight,
  sectionRef,
  genre,
  country,
}) {
  const [serviceIcons, setServiceIcons] = useState([]);

  useEffect(() => {
    const serviceNames = Object.keys(film.streamingInfo[country]);
    let serviceList = [];
    serviceNames.forEach((service) => {
      const indexOfService = servicesArray.findIndex((el) => {
        return el.id === service;
      });
      serviceList.push({
        name: service,
        image: servicesArray[indexOfService].image,
        link: film.streamingInfo[country][service],
      });
    });
    console.log(serviceList);
    setServiceIcons(serviceList);
  }, []);

  function handleClick(e) {
    setFilmClicked(true);
    if (!genre) {
      scrollHeight.current = sectionRef.current.scrollTop;
      console.log(sectionRef.current.scrollTop);
    }
  }

  return (
    <Link
      to={`/movies/${film.imdbId}`}
      className={clsx({
        [styles.MovieCardLink]: genre || !genre,
        [styles.genre]: genre,
      })}
      onClick={handleClick}>
      <div className={styles.MovieCard}>
        <div className={styles.textBox}>
          <p>{film.title}</p>
        </div>
        <img src={film.posterURLs.original} />
        <div className={styles.serviceIcons}>
          {serviceIcons.map((service, index) => {
            return (
              <React.Fragment key={`${service.name}-${index}`}>
                {service.link.length > 1 ? (
                  <>
                    {service.link.map((icon, index) => {
                      return (
                        <React.Fragment
                          key={`${service.name}${icon.type}${index}${film.title}`}>
                          <img src={service.image} />
                          <p>{icon.type}</p>
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <React.Fragment
                    key={`${service.name}${service.link[0].type}${index}${film.title}`}>
                    <img src={service.image} />
                    <p>{service.link[0].type}</p>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

//className={clsx({[styles.MovieCardLink] : genre || !genre, [styles.genre] : genre})}
