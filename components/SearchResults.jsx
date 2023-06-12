import styles from "@/styles/SearchResults.module.css";
import MovieCard from "./subcomponents/MovieCard";
import SearchBar from "./subcomponents/SearchBar";
import clsx from "clsx";

import { useEffect, useRef } from "react";

export default function SearchResults({
  setFilmClicked,
  searchResultsData,
  handleChange,
  refs,
  searchClosed,
  setExpand,
  expand,
  setSearchClosed,
  setSearchResultsData,
  searchText,
  noResults,
  setSearchText,
  options,
}) {
  const preload = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const close = useRef();

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

  function closeSearch(e) {
    close.current.style.display = "none";
    setSearchResultsData([]);
    setSearchText("");
    refs.search.current = "";
    const search = refs.expandedSearch.current;
    search.animate(
      {
        height: "8vh",
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
          backgroundColor: "rgba(0, 0, 0, 0)",
          height: "5vh",
          top: "1.5vh",
          width: "32vw",
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
        setSearchClosed(true);
        setExpand(false);
      });
  }

  function handleBlur() {
    if (!searchText) {
      closeSearch();
    }
  }

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
        ref={close}
        id="closeBtn">
        X
      </button>
      <div className={styles.searchBar}>
        <SearchBar
          handleChange={handleChange}
          focus={true}
          refs={refs}
          handleBlur={handleBlur}
          closeSearch={closeSearch}
          searchText={searchText}
        />
      </div>
      {searchResultsData.length ? (
        <div className={styles.flexContainer}>
          {searchResultsData.map((film, index) => {
            return (
              <MovieCard
                key={`${film.title}${film.id}${index}search`}
                setFilmClicked={setFilmClicked}
                film={film}
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
              {preload.map((temp, index) => {
                return <MovieCard film={temp} key={`${index}tempsearch`} />;
              })}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
