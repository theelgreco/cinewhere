import styles from "@/styles/SearchResults.module.css";
import MovieCard from "./subcomponents/MovieCard";
import SearchBar from "./subcomponents/SearchBar";
import Preload from "./subcomponents/Preload";
import Movies from "./Movies";
import clsx from "clsx";

import { useEffect, useRef } from "react";

export default function SearchResults({
  setFilmClicked,
  searchResultsData,
  refs,
  searchClosed,
  expand,
  setSearchClosed,
  searchText,
  noResults,
  closeSearch,
  options,
  rowSize,
}) {
  useEffect(() => {
    if (expand && searchClosed) {
      const search = refs.expandedSearch.current;
      search.animate(
        {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "8vh",
          top: "0",
          width: "100vw",
        },
        {
          duration: 300,
          iterations: 1,
          fill: "forwards",
          easing: "cubic-bezier(1, 0.285, 0, 0.96)",
        }
      );
      search
        .animate(
          {
            height: "100vh",
          },
          {
            duration: 500,
            delay: 500,
            iterations: 1,
            fill: "forwards",
            easing: "cubic-bezier(1, 0.285, 0, 0.96)",
          }
        )
        .finished.then(() => {
          setSearchClosed(false);
        });
    }
  }, [expand]);

  return (
    <div
      className={clsx({
        [styles.SearchResults]: searchClosed,
        [styles.SearchResultsExpand]: !searchClosed,
      })}
      ref={refs.expandedSearch}>
      <button
        onClick={closeSearch}
        className={styles.closeBtn}
        ref={refs.close}
        id="closeBtn">
        X
      </button>
      {searchResultsData.length ? (
        <div className={styles.flexContainer}>
          {searchResultsData.map((film, index) => {
            return (
              <MovieCard
                key={`${film.title}${film.id}${index}search`}
                setFilmClicked={setFilmClicked}
                film={film}
                search={true}
                data={searchResultsData}
                options={options}
              />
            );
          })}
        </div>
      ) : (
        <>
          {searchText && !noResults ? (
            <div className={styles.flexContainer}>
              <Preload rowSize={rowSize} parentComponent={"Search"} />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
