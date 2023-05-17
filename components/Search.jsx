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

  useEffect(() => {
    setSearchText("");
  }, []);

  useEffect(() => {
    setFinishedTyping(false);

    if (searchText) {
      setTimeout(() => {
        setFinishedTyping(true);
      }, 500);
    }
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
        setSearchResultsData(res);
        setFinishedTyping(false);
        // refs.page.current++;
      });
    }
  }, [finishedTyping]);

  function handleChange(e) {
    expand ? setSearchText(e.target.value) : (e.target.value = "");
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
        <SearchBar
          handleChange={handleChange}
          expandSearch={expandSearch}
          searchText={searchText}
        />
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
        />
      )}
    </section>
  );
}
