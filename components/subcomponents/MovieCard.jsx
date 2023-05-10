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
    if (Object.keys(film.streamingInfo).length) {
      const serviceNames = Object.keys(film.streamingInfo[country]) ?? null;
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
    }
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
        {/* <div className={styles.textBox}>
          <p>{film.title}</p>
        </div> */}
        <img src={film.posterURLs.original} />
        <div className={styles.serviceIcons}>
          {serviceIcons.length ? (
            serviceIcons.map((service, index) => {
              return (
                //prettier-ignore
                <React.Fragment key={`${service.name}${service.link[0].type}${index}${film.title}`}>
                  <img src={service.image} />
                </React.Fragment>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </Link>
  );
}
