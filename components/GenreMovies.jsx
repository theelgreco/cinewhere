import SortBy from "./subcomponents/SortBy";
import MovieCard from "./subcomponents/MovieCard";
import Preload from "./subcomponents/Preload";
import styles from "@/styles/GenreMovies.module.css";
import { useEffect, useState } from "react";
import { getFilmsTmdb } from "api";
import clsx from "clsx";

export default function GenreMovies({
  collapsedMenus,
  refs,
  options,
  setOptions,
  sort,
  setSort,
  order,
  setOrder,
  optionsClicked,
  setOptionsClicked,
  selectedGenres,
  setCollapsedMenus,
  setFilmClicked,
  settings,
  isMobile,
  setSelectedGenres,
  selectedServices,
  media_type,
}) {
  const [genreScroll, setGenreScroll] = useState({ atEnd: false, id: null });

  useEffect(() => {
    if (genreScroll.atEnd) {
      selectedGenres.forEach((genre) => {
        if (String(genre.id) === genreScroll.id) {
          let params = {
            page: genre.page + 1,
            with_watch_providers: selectedServices.join("|"),
            with_genres: genre.id,
            ...options,
          };
          getFilmsTmdb(params, media_type).then((res) => {
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
  }, [genreScroll]);

  function handleScroll(e) {
    const scrollTop = e.target.scrollTop;
    //prettier-ignore
    refs.scrollHeightGenre.current = scrollTop;
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
    <section
      id="sectionRefGenre"
      className={clsx({
        [styles.genreContainer]: !collapsedMenus,
        [styles.genreContainerCollapsed]: collapsedMenus,
      })}
      ref={refs.sectionRefGenre}
      onScroll={handleScroll}>
      <SortBy
        options={options}
        setOptions={setOptions}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        optionsClicked={optionsClicked}
        setOptionsClicked={setOptionsClicked}
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
                        isMobile={isMobile}
                        key={`${film.id}${genre.genre}`}
                        film={film}
                        setFilmClicked={setFilmClicked}
                        genre={true}
                        options={options}
                        settings={settings}
                      />
                    );
                  })
                ) : (
                  <Preload parentComponent={"MoviesGenre"} genre={true} />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </section>
  );
}
