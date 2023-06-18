import MovieCard from "./subcomponents/MovieCard";
import SortBy from "./subcomponents/SortBy";
import Preload from "./subcomponents/Preload";
import clsx from "clsx";
import styles from "@/styles/ServiceMovies.module.css";

export default function ServiceMovies({
  collapsedMenus,
  setCollapsedMenus,
  handleScroll,
  refs,
  options,
  setOptions,
  sort,
  setSort,
  order,
  setOrder,
  optionsClicked,
  setOptionsClicked,
  data,
  isMobile,
  setFilmClicked,
  settings,
  rowsObject,
  trailerRow,
  setTrailerRow,
  selectedServices,
  rowSize,
  handleClick,
}) {
  return (
    <section
      id="sectionRef"
      className={clsx({
        [styles.Movies]: !collapsedMenus,
        [styles.MoviesCollapsed]: collapsedMenus,
      })}
      onScroll={handleScroll}
      ref={refs.sectionRef}>
      <div
        className={clsx({
          [styles.collapseBtn]: !collapsedMenus,
          [styles.collapseBtnCollapsed]: collapsedMenus,
        })}
        onClick={() => {
          !collapsedMenus ? setCollapsedMenus(true) : setCollapsedMenus(false);
        }}>
        =
      </div>

      {data.length ? (
        <>
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
          <div className={styles.moviesFlex}>
            {data.map((film, index) => {
              return (
                <MovieCard
                  isMobile={isMobile}
                  key={`${index}${film.id}${film.title}`}
                  film={film}
                  setFilmClicked={setFilmClicked}
                  options={options}
                  settings={settings}
                  rowsObject={rowsObject}
                  trailerRow={trailerRow}
                  setTrailerRow={setTrailerRow}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>
          {selectedServices.length ? (
            <div className={styles.moviesFlex}>
              <Preload rowSize={rowSize} parentComponent={"MoviesService"} />
            </div>
          ) : (
            <>
              <button className={styles.searchAll} onClick={handleClick}>
                Search All
              </button>
            </>
          )}
        </>
      )}
    </section>
  );
}
