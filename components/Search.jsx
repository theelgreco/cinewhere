import SearchBar from "./subcomponents/SearchBar";
import SearchResults from "./SearchResults";
import styles from "@/styles/Search.module.css";
import { searchMovies } from "api";
import { useState, useEffect } from "react";

export default function Search({
  searchText,
  setSearchText,
  setFilmClicked,
  searchResultsData,
  setSearchResultsData,
  refs,
  expand,
  setExpand,
  searchClosed,
  setSearchClosed,
}) {
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // useEffect(() => {
  //   setSearchText("");
  // }, []);

  useEffect(() => {
    setFinishedTyping(false);

    if (searchText && !searchResultsData.length) {
      setTimeout(() => {
        setFinishedTyping(true);
      }, 500);
    } else if (!searchText) {
      setTimeout(() => {
        setFinishedTyping(true);
      }, 200);
    }
  }, [searchText]);

  useEffect(() => {
    if (finishedTyping && searchText) {
      refs.searchResultsPage.current = 1;
      let params = {
        query: searchText,
        page: refs.searchResultsPage.current,
      };
      searchMovies(params).then((res) => {
        if (!res.length) setNoResults(true);
        setSearchResultsData(res);
        setFinishedTyping(false);
        // refs.page.current++;
      });
    } else if (finishedTyping && !searchText) {
      setFinishedTyping(false);
    }
  }, [finishedTyping]);

  function handleChange(e) {
    if (noResults) setNoResults(false);
    setSearchResultsData([]);
    expand ? setSearchText(e.target.value) : (e.target.value = "");
    refs.search.current = e.target.value;
  }

  function handleClick(e) {
    e.preventDefault();

    e.target.previousSibling.value = "";
    setSearchText("");
  }

  function expandSearch(e) {
    if (!expand) {
      setExpand(true);
    }
    // !expand ? setExpand(true) : setExpand(false);
  }

  return (
    <section className={styles.Search}>
      {!expand ? (
        <SearchBar handleChange={handleChange} expandSearch={expandSearch} />
      ) : (
        <SearchResults
          setFilmClicked={setFilmClicked}
          searchResultsData={searchResultsData}
          handleChange={handleChange}
          refs={refs}
          setExpand={setExpand}
          searchClosed={searchClosed}
          expand={expand}
          setSearchClosed={setSearchClosed}
          setSearchResultsData={setSearchResultsData}
          searchText={searchText}
          noResults={noResults}
          setSearchText={setSearchText}
        />
      )}
    </section>
  );
}
