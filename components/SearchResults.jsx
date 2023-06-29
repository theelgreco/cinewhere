import styles from "@/styles/SearchResults.module.css";
import MovieCard from "./subcomponents/MovieCard";
import Preload from "./subcomponents/Preload";
import clsx from "clsx";
import { updateRows } from "utils/utils";
import { searchMovies } from "api";
import { useEffect, useState } from "react";

export default function SearchResults({
  setFilmClicked,
  searchResultsData,
  setSearchResultsData,
  refs,
  searchClosed,
  expand,
  setSearchClosed,
  searchText,
  closeSearch,
  options,
  rowSize,
}) {
  const [rowsObject, setRowsObject] = useState({});
  const [trailerRow, setTrailerRow] = useState(null);
  const [atBottom, setAtBottom] = useState(false);

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

  useEffect(() => {
    if (searchResultsData.length) {
      let rowsObjectCopy = { ...rowsObject };
      setRowsObject(updateRows(searchResultsData, rowSize, rowsObjectCopy));
    }
  }, [rowSize, searchResultsData]);

  useEffect(() => {
    if (atBottom) {
      let params = {
        page: refs.searchResultsPage.current,
        query: searchText,
      };
      searchMovies(params).then((res) => {
        setSearchResultsData([...searchResultsData, ...res]);
        refs.searchResultsPage.current++;
        setAtBottom(false);
      });
    }
  }, [atBottom]);

  function handleScroll(e) {
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    //prettier-ignore
    if (scrollTop > scrollHeight - clientHeight - 450 && !atBottom) {
      setAtBottom(true);
    }
    // refs.scrollHeight.current = scrollTop;
  }

  function render() {
    if (searchResultsData === "no results") {
      return (
        <div className={styles.noResults}>
          <h1>NO RESULTS</h1>
          <p>TRY AGAIN</p>
        </div>
      );
    } else if (searchResultsData.length) {
      return (
        <div className={styles.flexContainer} onScroll={handleScroll}>
          {searchResultsData.map((film, index) => {
            return (
              <MovieCard
                key={`${film.title}${film.id}${index}search`}
                setFilmClicked={setFilmClicked}
                film={film}
                data={searchResultsData}
                options={options}
                rowsObject={rowsObject}
                trailerRow={trailerRow}
                setTrailerRow={setTrailerRow}
              />
            );
          })}
        </div>
      );
    } else if (searchText) {
      return (
        <div className={styles.flexContainer}>
          <Preload rowSize={rowSize} parentComponent={"Search"} />
        </div>
      );
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
        ref={refs.close}
        id="closeBtn">
        X
      </button>
      {render()}
    </div>
  );
}
