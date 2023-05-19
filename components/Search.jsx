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

  useEffect(() => {
    setFinishedTyping(false);

    setTimeout(() => {
      setFinishedTyping(true);
    }, 1200);
  }, [searchText]);

  useEffect(() => {
    if (finishedTyping && searchText) {
      setSearchResultsData([]);
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
      setSearchResultsData([]);
      setFinishedTyping(false);
    }
  }, [finishedTyping]);

  function handleChange(e) {
    setSearchResultsData([]);
    if (noResults) setNoResults(false);
    expand ? setSearchText(e.target.value) : (e.target.value = "");
    refs.search.current = e.target.value;
  }

  function expandSearch(e) {
    if (!expand) {
      setExpand(true);
    }
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
