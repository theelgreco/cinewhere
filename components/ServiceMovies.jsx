import MovieCard from "./subcomponents/MovieCard";
import SortBy from "./subcomponents/SortBy";
import Preload from "./subcomponents/Preload";
import FilterBar from "./FilterBar";
import clsx from "clsx";
import styles from "@/styles/ServiceMovies.module.css";
import { getFilmsTmdb } from "api";
import { updateRows } from "utils/utils";
import { useEffect, useState } from "react";

export default function ServiceMovies({
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
  data,
  isMobile,
  setFilmClicked,
  settings,
  trailerRow,
  setTrailerRow,
  selectedServices,
  rowSize,
  media_type,
  setData,
  setServiceIdToSearch,
  setGenreIdToSearch,
  setClicked,
  setGenreList,
  set_media_type,
  setSelectedGenres,
  atBottom,
  setAtBottom,
}) {
  const [rowsObject, setRowsObject] = useState({});

  useEffect(() => {
    if (data.length) {
      refs.sectionRef.current.scrollTop = refs.scrollHeight.current;
    }
  }, []);

  useEffect(() => {
    if (atBottom) {
      let params = {
        page: refs.page.current,
        with_watch_providers: selectedServices.join("|"),
        ...options,
      };
      getFilmsTmdb(params, media_type).then((res) => {
        setData([...data, ...res]);
        refs.page.current++;
        setAtBottom(false);
      });
    }
  }, [atBottom]);

  useEffect(() => {
    if (data.length) {
      let rowsObjectCopy = { ...rowsObject };
      setRowsObject(updateRows(data, rowSize, rowsObjectCopy));
    }
  }, [rowSize, data]);

  function handleScroll(e) {
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    //prettier-ignore
    if (scrollTop > scrollHeight - clientHeight - 450 && !atBottom) {
      setAtBottom(true);
    }

    refs.scrollHeight.current = scrollTop;
  }

  function handleClick(e) {
    setData([]);
    refs.sectionRef.current.scrollTop = 0;
    refs.page.current = 1;
    let params = {
      page: 1,
      ...options,
    };
    getFilmsTmdb(params, media_type).then((res) => {
      setData(res);
      refs.page.current++;
      setClicked(false);
    });
    setServiceIdToSearch({});
    setGenreIdToSearch({});
  }

  function renderResults() {
    if (data === "no results") {
      return (
        <div className={styles.noResults}>
          <h1>NO RESULTS</h1>
          <p>TRY AGAIN</p>
        </div>
      );
    } else if (data.length && Array.isArray(data)) {
      return (
        <>
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
      );
    } else if (selectedServices.length && !data.length) {
      return (
        <div className={styles.moviesFlex}>
          <Preload rowSize={rowSize} parentComponent={"MoviesService"} />
        </div>
      );
    }
  }

  return (
    <section
      id="sectionRef"
      className={clsx({
        [styles.Movies]: !collapsedMenus,
        [styles.MoviesCollapsed]: collapsedMenus,
      })}
      onScroll={handleScroll}
      ref={refs.sectionRef}>
      {selectedServices.length && data !== "no results" ? (
        <FilterBar
          set_media_type={set_media_type}
          setSelectedGenres={setSelectedGenres}
          setGenreList={setGenreList}
          setOptionsClicked={setOptionsClicked}
          media_type={media_type}
          options={options}
          setOptions={setOptions}
          sort={sort}
          setSort={setSort}
          order={order}
          setOrder={setOrder}
          optionsClicked={optionsClicked}
        />
      ) : (
        <></>
      )}
      {renderResults()}
    </section>
  );
}
