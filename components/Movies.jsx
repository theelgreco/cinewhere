import styles from "@/styles/Movies.module.css";
import MovieCard from "@/subcomponents/MovieCard";
import SortBy from "./subcomponents/SortBy";
import { getFilmsTmdb, searchMovies } from "api";
import { useEffect, useState } from "react";
import React from "react";

export default function Movies({
  isMobile,
  setSelectedServices,
  selectedServices,
  data,
  setData,
  genreData,
  setGenreData,
  filmClicked,
  setFilmClicked,
  genreIdToSearch,
  setGenreIdToSearch,
  serviceIdToSearch,
  setServiceIdToSearch,
  selectedGenres,
  setSelectedGenres,
  country,
  refs,
  options,
  setOptions,
  sort,
  setSort,
  order,
  setOrder,
}) {
  const [atBottom, setAtBottom] = useState(false);
  const [genreScroll, setGenreScroll] = useState({ atEnd: false, id: null });
  const preload = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

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

  // useEffect(() => {
  //   if (!filmClicked) {
  //     if (selectedServices.length && !selectedGenres.length) {
  //       setData([]);
  //       refs.sectionRef.current.scrollTop = 0;
  //       refs.page.current = 1;
  //       let params = {
  //         page: 1,
  //         watch_region: "GB",
  //         with_watch_monetization_types: "flatrate",
  //         with_watch_providers: selectedServices.join("|"),
  //         ...options,
  //       };
  //       getFilmsTmdb(params).then((res) => {
  //         setData(res);
  //         refs.page.current++;
  //       });
  //     } else if (selectedServices.length && selectedGenres.length) {
  //       selectedGenres.forEach((genre) => {
  //         if (refs[genre.id].current) {
  //           refs[genre.id].current.scrollLeft = 0;
  //         }
  //       });

  //       const genreDataCopy = [...selectedGenres];
  //       genreDataCopy.forEach((genre) => {
  //         genre.movies = [];
  //         setSelectedGenres(genreDataCopy);
  //         let params = {
  //           page: 1,
  //           watch_region: "GB",
  //           with_watch_monetization_types: "flatrate",
  //           with_watch_providers: selectedServices.join("|"),
  //           with_genres: genre.id,
  //           ...options,
  //         };
  //         getFilmsTmdb(params).then((res) => {
  //           const indexOfGenre = genreDataCopy.findIndex(
  //             (el) => el.id === genre.id
  //           );
  //           genreDataCopy[indexOfGenre].movies = res;
  //           genreDataCopy[indexOfGenre].page = 1;
  //           setSelectedGenres(genreDataCopy);
  //         });
  //       });
  //     } else if (!selectedServices.length && !selectedGenres.length) {
  //       setData([]);
  //       setSelectedGenres([]);
  //     }

  //     // else if (!selectedServices.length && selectedGenres.length) {
  //     //   const genreDataCopy = [...selectedGenres];
  //     //   genreDataCopy.forEach((genre) => {
  //     //     genre.movies = [];
  //     //     setSelectedGenres(genreDataCopy);
  //     //     let params = {
  //     //       page: 1,
  //     //       watch_region: "GB",
  //     //       with_watch_monetization_types: "flatrate",
  //     //       with_genres: genre.id,
  //     //       ...options,
  //     //     };
  //     //     getFilmsTmdb(params).then((res) => {
  //     //       const indexOfGenre = genreDataCopy.findIndex(
  //     //         (el) => el.id === genre.id
  //     //       );
  //     //       genreDataCopy[indexOfGenre].movies = res;
  //     //       genreDataCopy[indexOfGenre].page = 1;
  //     //       setSelectedGenres(genreDataCopy);
  //     //     });
  //     //   });
  //     // }
  //   }
  //   setFilmClicked(false);
  // }, [selectedServices, options]);

  // useEffect(() => {
  //   if (!filmClicked) {
  //     if (genreIdToSearch && selectedServices.length) {
  //       let params = {
  //         page: 1,
  //         watch_region: "GB",
  //         with_watch_monetization_types: "flatrate",
  //         with_watch_providers: selectedServices.join("|"),
  //         with_genres: genreIdToSearch,
  //         ...options,
  //       };
  //       getFilmsTmdb(params).then((res) => {
  //         const genreDataCopy = [...selectedGenres];
  //         const indexOfGenre = genreDataCopy.findIndex(
  //           (el) => el.id === genreIdToSearch
  //         );
  //         genreDataCopy[indexOfGenre].movies = res;
  //         genreDataCopy[indexOfGenre].page = 1;
  //         setSelectedGenres(genreDataCopy);
  //         setGenreIdToSearch(null);
  //       });
  //     } else if (!genreIdToSearch && selectedServices.length) {
  //       setData([]);
  //       refs.page.current = 1;
  //       let params = {
  //         page: 1,
  //         watch_region: "GB",
  //         with_watch_monetization_types: "flatrate",
  //         with_watch_providers: selectedServices.join("|"),
  //         ...options,
  //       };
  //       getFilmsTmdb(params).then((res) => {
  //         setData(res);
  //         refs.page.current++;
  //       });
  //     }
  //   }
  //   setFilmClicked(false);
  // }, [genreIdToSearch, options]);

  /*  
      possibilities:

      - click on add or remove service:
        - with no genres selected - return a search with service(s) and set data !!!!!!!!
        - with no more services selected and no genres selected - set data to empty !!!!!!!!
        - with genres selected - return a search for each genre with service(s) and set genre data !!!!!!!!
        - with no more services selected and genres selected - return a search for each genre with all services and set genre data !!!!!!!!

      - click on add genre:
        - with service(s) already selected - return a search for genre with service(s) and add to end of genre data !!!!!!!!
        - with no services selected - return a search for genre no services + genre and add to genre data !!!!!!!!

      - click on remove genre:
        - with no other genres selected and services selected - return a search with services and set data !!!!!!!!
        - with no other genres selected and no services selected - set data to nothing !!!!!!!!
        - with other genres selected - remove genre from genre data  !!!!!!!
  */

  useEffect(() => {
    //prettier-ignore
    // only execute if a service has been clicked with at least one service selected and no genres selected or if the last genre has been removed with services still selected
    if ((Object.keys(serviceIdToSearch).length || (Object.keys(genreIdToSearch).length && !genreIdToSearch.add)) && (selectedServices.length && !selectedGenres.length && !filmClicked)) {
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
        setServiceIdToSearch({})
        setGenreIdToSearch({})
    }

    //prettier-ignore
    // only execute if a service has been clicked with genres selected
    if (Object.keys(serviceIdToSearch).length && selectedServices.length && selectedGenres.length && !filmClicked) {
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
      setServiceIdToSearch({})
    }

    //prettier-ignore
    // only execute if the last service has been removed with genres selected
    if (Object.keys(serviceIdToSearch).length && !selectedServices.length && selectedGenres.length && !filmClicked){
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
      setServiceIdToSearch({})
    }

    //prettier-ignore
    // only execute if the last service has been removed with no genres selected or if the last genre has been removed with no services selected
    if((Object.keys(serviceIdToSearch).length || (Object.keys(genreIdToSearch).length && !genreIdToSearch.add)) && (!selectedServices.length && !selectedGenres.length && !filmClicked)) {
      setData([])
      setServiceIdToSearch({})
      setGenreIdToSearch({})
    }

    //prettier-ignore
    // only execute if a genre has been added with services selected
    if (Object.keys(genreIdToSearch).length && genreIdToSearch.add && selectedServices.length && !filmClicked) {
      let params = {
        page: 1,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
        with_genres: genreIdToSearch.id,
        ...options,
      };
      getFilmsTmdb(params).then((res) => {
        const genreDataCopy = [...selectedGenres];
        const indexOfGenre = genreDataCopy.findIndex(
          (el) => el.id === genreIdToSearch.id
        );
        genreDataCopy[indexOfGenre].movies = res;
        genreDataCopy[indexOfGenre].page = 1;
        setSelectedGenres(genreDataCopy);
      });
      setGenreIdToSearch({});
    }

    //prettier-ignore
    // only execute if a genre has been added with no services selected
    if (Object.keys(genreIdToSearch).length && genreIdToSearch.add && !selectedServices.length && !filmClicked){
      let params = {
        page: 1,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_genres: genreIdToSearch.id,
        ...options,
      };
      getFilmsTmdb(params).then((res) => {
        const genreDataCopy = [...selectedGenres];
        const indexOfGenre = genreDataCopy.findIndex(
          (el) => el.id === genreIdToSearch.id
        );
        genreDataCopy[indexOfGenre].movies = res;
        genreDataCopy[indexOfGenre].page = 1;
        setSelectedGenres(genreDataCopy);
      });
      setGenreIdToSearch({});
    }

    setFilmClicked(false);
  }, [genreIdToSearch, serviceIdToSearch, options]);

  useEffect(() => {
    //prettier-ignore
    //only execute if options are updated and there are services selected but no genres selected
    if(Object.keys(options) && selectedServices.length && !selectedGenres.length && !filmClicked) {
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
        setServiceIdToSearch({})
        setGenreIdToSearch({})
    }
  }, [options]);

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
