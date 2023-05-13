import styles from "@/styles/Movies.module.css";
import MovieCard from "@/subcomponents/MovieCard";
import { getServiceFilms, searchByTitle, testTmdb } from "api";
import { useEffect, useState, useRef } from "react";
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
  nextPage,
  setNextPage,
  genreIdToSearch,
  selectedGenres,
  setSelectedGenres,
  setGenreIdToSearch,
  country,
  refs,
  showSearchResults,
  searchText,
}) {
  const [page, setPage] = useState(1);
  const [genreScroll, setGenreScroll] = useState({ atEnd: false, id: null });
  // useEffect(() => {
  //   if (!selectedGenres.length && data.length) {
  //     refs.sectionRef.current.scrollTop = refs.scrollHeight.current;
  //   }

  //   selectedGenres.forEach((genre) => {
  //     if (genre.scrollLeft) {
  //       refs[genre.genre].current.scrollLeft = genre.scrollLeft;
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (selectedServices.length && !selectedGenres.length) {
      setData([]);
      setPage(1);
      let params = {
        page: 1,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
      };
      testTmdb(params).then((res) => {
        setData(res);
        setPage(page + 1);
      });
    } else if (selectedServices.length && selectedGenres.length) {
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
        testTmdb(params).then((res) => {
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;
          setSelectedGenres(genreDataCopy);
        });
      });
    } else {
      setData([]);
      setPage(1);
    }

    setFilmClicked(false);
  }, [selectedServices]);

  useEffect(() => {
    // else if (
    //     selectedServices.length && !filmClicked && !selectedGenres.length) {
    //     getServiceFilms(selectedServices, country).then((res) => {
    //       refs.sectionRef.current.scrollTop = 0;
    //       setData(res.result);
    //       setNextPage(res.nextCursor);
    //     });
    //   }

    // if (!selectedGenres.length && !data.length) {
    //   setSelectedServices([]);
    // }

    if (genreIdToSearch && selectedServices.length) {
      let params = {
        page: 1,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
        with_genres: genreIdToSearch,
      };
      testTmdb(params).then((res) => {
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
      console.log(page);
      let params = {
        page: page,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
      };
      testTmdb(params).then((res) => {
        setData([...data, ...res]);
        setPage(page + 1);
        setAtBottom(false);
      });
    } else if (genreScroll.atEnd) {
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
          testTmdb(params).then((res) => {
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

  // MORE BELOW \\

  // useEffect(() => {
  //   if (selectedServices.length && !filmClicked && !selectedGenres.length) {
  //     getServiceFilms(selectedServices, country).then((res) => {
  //       refs.sectionRef.current.scrollTop = 0;
  //       setData(res.result);
  //       setNextPage(res.nextCursor);
  //     });
  //     //
  //   }
  // }, [selectedGenres, selectedServices]);

  // useEffect(() => {
  //   if (showSearchResults) {
  //     searchByTitle(searchText, country).then((res) => {
  //       setData(res);
  //     });
  //   }
  // }, [showSearchResults]);

  function handleScroll(e) {
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    if (scrollTop > scrollHeight - clientHeight - 450 && !atBottom) {
      setAtBottom(true);
    }

    refs.scrollHeight.current = scrollTop;
  }

  //if original index is = to selectedGenres.length - 1

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
        refs[genre.id].current.scrollLeft = scrollLeft;
      }
    });
  }

  return (
    <>
      {!selectedGenres.length ? (
        <section
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
