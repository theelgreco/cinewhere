import MovieCard from "./subcomponents/MovieCard";
import SortBy from "./subcomponents/SortBy";
import Preload from "./subcomponents/Preload";
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
}) {
  const [atBottom, setAtBottom] = useState(false);
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

  return (
    <section
      id="sectionRef"
      className={clsx({
        [styles.Movies]: !collapsedMenus,
        [styles.MoviesCollapsed]: collapsedMenus,
      })}
      onScroll={handleScroll}
      ref={refs.sectionRef}>
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
