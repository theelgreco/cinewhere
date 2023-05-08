import styles from "@/styles/Movies.module.css";
import MovieCard from "@/subcomponents/MovieCard";
import { getServiceFilms } from "api";
import { useEffect, useState } from "react";

export default function Movies({
  isMobile,
  atBottom,
  setAtBottom,
  setSelectedServices,
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
  setGenreIdToSearch,
  country,
}) {
  useEffect(() => {
    if (!selectedGenres.length) {
      sectionRef.current.scrollTop = scrollHeight.current;
    }
  }, []);

  useEffect(() => {
    //if there are no genres selected
    if (selectedServices.length && !filmClicked && !selectedGenres.length) {
      getServiceFilms(selectedServices, country).then((res) => {
        sectionRef.current.scrollTop = 0;
        setData(res.result);
        setNextPage(res.nextCursor);
      });
      //
    } else if (
      selectedServices.length &&
      !filmClicked &&
      selectedGenres.length
    ) {
      selectedGenres.forEach((genre) => {
        getServiceFilms(selectedServices, country, {
          genre: genre.id,
          cursor: genre.cursor,
        }).then((res) => {
          const genreDataCopy = [...selectedGenres];
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res.result;
          genreDataCopy[indexOfGenre].cursor = res.nextCursor;
          setSelectedGenres(genreDataCopy);
        });
      });
    } else if (!selectedServices.length) {
      setData([]);
      setSelectedGenres([]);
    }

    setFilmClicked(false);
  }, [selectedServices]);

  useEffect(() => {
    if (atBottom) {
      getServiceFilms(selectedServices, country, { cursor: nextPage }).then(
        (res) => {
          setData([...data, ...res.result]);
          setNextPage(res.nextCursor);
          setAtBottom(false);
        }
      );
    }
  }, [atBottom]);

  useEffect(() => {
    if (selectedServices.length && !filmClicked && genreIdToSearch) {
      getServiceFilms(selectedServices, country, {
        genre: genreIdToSearch,
      }).then((res) => {
        const genreDataCopy = [...selectedGenres];
        const indexOfGenre = genreDataCopy.findIndex(
          (el) => el.id === genreIdToSearch
        );
        genreDataCopy[indexOfGenre].movies = res.result;
        genreDataCopy[indexOfGenre].cursor = res.nextCursor;
        setSelectedGenres(genreDataCopy);
        setGenreIdToSearch(null);
      });
    }

    if (!selectedGenres.length && !data.length) {
      setSelectedServices([]);
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
                    country={country}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </section>
      ) : (
        <section className={styles.genreContainer}>
          {selectedGenres.map((genre) => {
            return (
              <div key={genre.id} className={styles.individualGenreContainer}>
                <div className={styles.genreName}>
                  <p>{genre.genre}</p>
                </div>
                {genre.movies ? (
                  <div className={styles.genreMovies}>
                    {genre.movies.map((film) => {
                      return (
                        <MovieCard
                          key={`${film.imdbId}${genre.genre}`}
                          film={film}
                          setFilmClicked={setFilmClicked}
                          genre={true}
                          country={country}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}
