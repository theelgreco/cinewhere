import styles from "@/styles/Movies.module.css";
import MovieCard from "@/subcomponents/MovieCard";
import { getServiceFilms } from "api";
import { useEffect, useState } from "react";

export default function Movies({
  isMobile,
  atBottom,
  setAtBottom,
  selectedServices,
  data,
  setData,
  filmClicked,
  setFilmClicked,
  scrollHeight,
  sectionRef,
  nextPage,
  setNextPage,
  genreIdToSearch,
  selectedGenres,
  setSelectedGenres,
}) {
  useEffect(() => {
    sectionRef.current.scrollTop = scrollHeight.current;
  }, []);

  useEffect(() => {
    if (selectedServices.length && !filmClicked) {
      getServiceFilms(selectedServices).then((res) => {
        setData(res.result);
        setNextPage(res.nextCursor);
      });
    } else if (!selectedServices.length) {
      setData([]);
    }

    setFilmClicked(false);
  }, [selectedServices]);

  useEffect(() => {
    if (atBottom) {
      getServiceFilms(selectedServices, { cursor: nextPage }).then((res) => {
        setData([...data, ...res.result]);
        setNextPage(res.nextCursor);
        setAtBottom(false);
      });
    }
  }, [atBottom]);

  useEffect(() => {
    if (selectedServices.length && !filmClicked) {
      getServiceFilms(selectedServices, { genre: genreIdToSearch }).then(
        (res) => {
          const genreDataCopy = [...selectedGenres];
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genreIdToSearch
          );
          genreDataCopy[indexOfGenre].movies = res.result;
          // const newGenreSection = { ...genreIdToSearch, movies: res.result };
          setSelectedGenres(genreDataCopy);
        }
      );
    }
  }, [genreIdToSearch]);

  function handleScroll(e) {
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    if (scrollTop > scrollHeight - clientHeight - 150 && !atBottom) {
      setAtBottom(true);
    }
  }

  // useEffect(() => {
  //   console.log(options);
  //   if (options.url) {
  //     axios
  //       .request(options)
  //       .then((res) => {
  //         console.log([...res.data.result]);
  //         setNextPage(res.data.nextCursor);
  //         return res.data.result;
  //       })
  //       .then((res) => {
  //         setData([...data, ...res]);
  //         localStorage.setItem("films", JSON.stringify(data));
  //         setAtBottom(false);
  //       });
  //   }
  // }, [options]);

  return (
    <>
      {!selectedGenres.length ? (
        <section
          className={styles.Movies}
          onScroll={handleScroll}
          ref={sectionRef}>
          <div className={styles.moviesFlex}>
            {data ? (
              data.map((film, index) => {
                return (
                  <MovieCard
                    key={index}
                    film={film}
                    setFilmClicked={setFilmClicked}
                    scrollHeight={scrollHeight}
                    sectionRef={sectionRef}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </section>
      ) : (
        <section>
          {selectedGenres.map((genre) => {
            return <div key={genre.id}>{genre.genre}</div>;
          })}
        </section>
      )}
    </>
  );
}
