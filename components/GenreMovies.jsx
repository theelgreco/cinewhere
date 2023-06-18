import SortBy from "./subcomponents/SortBy";
import MovieCard from "./subcomponents/MovieCard";
import Preload from "./subcomponents/Preload";
import styles from "@/styles/GenreMovies.module.css";
import clsx from "clsx";

export default function GenreMovies({
  collapsedMenus,
  refs,
  handleScroll,
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
  handleGenreScroll,
  setFilmClicked,
  settings,
  isMobile,
}) {
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
            <div
              className={clsx({
                [styles.collapseBtn]: !collapsedMenus,
                [styles.collapseBtnCollapsed]: collapsedMenus,
              })}
              onClick={() => {
                !collapsedMenus
                  ? setCollapsedMenus(true)
                  : setCollapsedMenus(false);
              }}>
              =
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
