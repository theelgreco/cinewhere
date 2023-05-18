import styles from "@/styles/Movies.module.css";
import MovieCard from "@/subcomponents/MovieCard";
import SortBy from "./subcomponents/SortBy";
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
  options,
  setOptions,
  sort,
  setSort,
  order,
  setOrder,
}) {
  const [genreScroll, setGenreScroll] = useState({ atEnd: false, id: null });
  const preload = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

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
    if (!filmClicked) {
      if (selectedServices.length && !selectedGenres.length) {
        setData([]);
        refs.sectionRef.current.scrollTop = 0;
        refs.page.current = 1;
        let params = {
          page: 1,
          watch_region: "GB",
          with_watch_monetization_types: "flatrate",
          with_watch_providers: selectedServices.join("|"),
          ...options,
        };
        getFilmsTmdb(params).then((res) => {
          setData(res);
          refs.page.current++;
        });
      } else if (selectedServices.length && selectedGenres.length) {
        selectedGenres.forEach((genre) => {
          if (refs[genre.id].current) {
            refs[genre.id].current.scrollLeft = 0;
          }
        });

        const genreDataCopy = [...selectedGenres];
        genreDataCopy.forEach((genre) => {
          genre.movies = [];
          setSelectedGenres(genreDataCopy);
          let params = {
            page: 1,
            watch_region: "GB",
            with_watch_monetization_types: "flatrate",
            with_watch_providers: selectedServices.join("|"),
            with_genres: genre.id,
            ...options,
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
      } else if (!selectedServices.length && selectedGenres.length) {
        setData([]);
        setSelectedGenres([]);
      }
    }
    setFilmClicked(false);
  }, [selectedServices, options]);

  useEffect(() => {
    if (!filmClicked) {
      if (genreIdToSearch && selectedServices.length) {
        let params = {
          page: 1,
          watch_region: "GB",
          with_watch_monetization_types: "flatrate",
          with_watch_providers: selectedServices.join("|"),
          with_genres: genreIdToSearch,
          ...options,
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
      } else if (!genreIdToSearch && selectedServices.length) {
        setData([]);
        refs.page.current = 1;
        let params = {
          page: 1,
          watch_region: "GB",
          with_watch_monetization_types: "flatrate",
          with_watch_providers: selectedServices.join("|"),
          ...options,
        };
        getFilmsTmdb(params).then((res) => {
          setData(res);
          refs.page.current++;
        });
      }
    }
    setFilmClicked(false);
  }, [genreIdToSearch, options]);

  useEffect(() => {
    if (atBottom) {
      let params = {
        page: refs.page.current,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
        ...options,
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
            ...options,
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
          {selectedServices.length ? (
            <SortBy
              options={options}
              setOptions={setOptions}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
            />
          ) : (
            <></>
          )}
          <div className={styles.moviesFlex}>
            {data.length ? (
              data.map((film, index) => {
                return (
                  <MovieCard
                    key={`${index}${film.id}${film.title}`}
                    film={film}
                    setFilmClicked={setFilmClicked}
                    data={data}
                    country={country}
                  />
                );
              })
            ) : (
              <>
                {selectedServices.length ? (
                  <div className={styles.moviesFlex}>
                    {preload.map((temp, index) => {
                      return (
                        <MovieCard film={temp} key={`${index}servicetemp`} />
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </section>
      ) : (
        <section
          id="sectionRefGenre"
          className={styles.genreContainer}
          ref={refs.sectionRefGenre}
          onScroll={handleScroll}>
          <SortBy
            options={options}
            setOptions={setOptions}
            sort={sort}
            setSort={setSort}
            order={order}
            setOrder={setOrder}
          />
          {selectedGenres.map((genre) => {
            return (
              <div
                key={`${genre.id}data`}
                className={styles.individualGenreContainer}>
                <div className={styles.genreName}>
                  <p>{genre.genre}</p>
                </div>

                {genre.movies ? (
                  <div
                    className={styles.genreMovies}
                    onScroll={handleGenreScroll}
                    id={genre.id}
                    ref={refs[genre.id]}>
                    {genre.movies.length ? (
                      genre.movies.map((film) => {
                        return (
                          <MovieCard
                            key={`${film.id}${genre.genre}`}
                            film={film}
                            setFilmClicked={setFilmClicked}
                            genre={true}
                            country={country}
                          />
                        );
                      })
                    ) : (
                      <>
                        {preload.map((temp, index) => {
                          return (
                            <MovieCard film={temp} key={`${index}genretemp`} />
                          );
                        })}
                      </>
                    )}
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
