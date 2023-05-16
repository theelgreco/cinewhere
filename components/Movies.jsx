import styles from "@/styles/Movies.module.css";
import MovieCard from "@/subcomponents/MovieCard";
import { getFilmsTmdb, searchMovies } from "api";
import { useEffect, useState } from "react";
import React from "react";

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
  genreIdToSearch,
  selectedGenres,
  setSelectedGenres,
  setGenreIdToSearch,
  country,
  refs,
}) {
  const [genreScroll, setGenreScroll] = useState({ atEnd: false, id: null });

  useEffect(() => {
    if (!selectedGenres.length && data.length) {
      refs.sectionRef.current.scrollTop = refs.scrollHeight.current;
    } else if (selectedGenres.length) {
      refs.sectionRefGenre.current.scrollTop = refs.scrollHeightGenre.current;
    }

    selectedGenres.forEach((genre) => {
      if (genre.scrollLeft) {
        refs[genre.id].current.scrollLeft = genre.scrollLeft;
      }
    });
  }, []);

  useEffect(() => {
    if (selectedServices.length && !selectedGenres.length && !filmClicked) {
      setData([]);
      refs.page.current = 1;
      let params = {
        page: 1,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
      };
      getFilmsTmdb(params).then((res) => {
        setData(res);
        refs.page.current++;
      });
    } else if (
      selectedServices.length &&
      selectedGenres.length &&
      !filmClicked
    ) {
      selectedGenres.forEach((genre) => {
        if (refs[genre.id].current) {
          refs[genre.id].current.scrollLeft = 0;
        }
      });

      selectedGenres.forEach((genre) => {
        const genreDataCopy = [...selectedGenres];
        let params = {
          page: 1,
          watch_region: "GB",
          with_watch_monetization_types: "flatrate",
          with_watch_providers: selectedServices.join("|"),
          with_genres: genre.id,
        };
        getFilmsTmdb(params).then((res) => {
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;
          setSelectedGenres(genreDataCopy);
        });
      });
    } else if (!filmClicked) {
      setData([]);
      if (Object.keys(refs).length) {
        refs.page.current = 1;
      }
    }

    setFilmClicked(false);
  }, [selectedServices]);

  useEffect(() => {
    if (genreIdToSearch && selectedServices.length) {
      let params = {
        page: 1,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
        with_genres: genreIdToSearch,
      };
      getFilmsTmdb(params).then((res) => {
        const genreDataCopy = [...selectedGenres];
        const indexOfGenre = genreDataCopy.findIndex(
          (el) => el.id === genreIdToSearch
        );
        genreDataCopy[indexOfGenre].movies = res;
        genreDataCopy[indexOfGenre].page = 1;
        setSelectedGenres(genreDataCopy);
        setGenreIdToSearch(null);
      });
    }
  }, [genreIdToSearch]);

  useEffect(() => {
    if (atBottom) {
      let params = {
        page: refs.page.current,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
      };
      getFilmsTmdb(params).then((res) => {
        setData([...data, ...res]);
        refs.page.current++;
        setAtBottom(false);
      });
    }

    if (genreScroll.atEnd) {
      selectedGenres.forEach((genre) => {
        if (String(genre.id) === genreScroll.id) {
          console.log(genre);
          let params = {
            page: genre.page + 1,
            watch_region: "GB",
            with_watch_monetization_types: "flatrate",
            with_watch_providers: selectedServices.join("|"),
            with_genres: genre.id,
          };
          getFilmsTmdb(params).then((res) => {
            const genreDataCopy = [...selectedGenres];
            const indexOfGenre = genreDataCopy.findIndex(
              (el) => el.id === genre.id
            );
            //prettier-ignore
            genreDataCopy[indexOfGenre].movies = [...genreDataCopy[indexOfGenre].movies, ...res];
            genreDataCopy[indexOfGenre].page++;
            setSelectedGenres(genreDataCopy);
            setGenreScroll({ atEnd: false, id: null });
          });
        }
      });
    }
  }, [atBottom, genreScroll]);

  function handleScroll(e) {
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    //prettier-ignore
    if (scrollTop > scrollHeight - clientHeight - 450 && !atBottom && e.target.id === "sectionRef") {
      setAtBottom(true);
    }

    if (e.target.id === "sectionRef") {
      refs.scrollHeight.current = scrollTop;
    } else if (e.target.id === "sectionRefGenre") {
      refs.scrollHeightGenre.current = scrollTop;
    }
  }

  function handleGenreScroll(e) {
    const genresCopy = [...selectedGenres];

    const scrollWidth = e.target.scrollWidth;
    const clientWidth = e.target.clientWidth;
    const scrollLeft = e.target.scrollLeft;

    if (scrollLeft > scrollWidth - clientWidth - 450 && !genreScroll.atEnd) {
      setGenreScroll({ atEnd: true, id: e.target.id });
    }

    genresCopy.map((genre) => {
      if (String(genre.id) === e.target.id) {
        genre.scrollLeft = scrollLeft;
      }
    });
  }

  return (
    <>
      {!selectedGenres.length ? (
        <section
          id="sectionRef"
          className={styles.Movies}
          onScroll={handleScroll}
          ref={refs.sectionRef}>
          <div className={styles.moviesFlex}>
            {data ? (
              data.map((film, index) => {
                return (
                  <MovieCard
                    key={index}
                    film={film}
                    setFilmClicked={setFilmClicked}
                    data={data}
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
        <section
          id="sectionRefGenre"
          className={styles.genreContainer}
          ref={refs.sectionRefGenre}
          onScroll={handleScroll}>
          {selectedGenres.map((genre) => {
            return (
              <div key={genre.id} className={styles.individualGenreContainer}>
                <div className={styles.genreName}>
                  <p>{genre.genre}</p>
                </div>
                {genre.movies ? (
                  <div
                    className={styles.genreMovies}
                    onScroll={handleGenreScroll}
                    id={genre.id}
                    ref={refs[genre.id]}>
                    {genre.movies.map((film) => {
                      return (
                        <MovieCard
                          key={`${film.id}${genre.genre}`}
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
