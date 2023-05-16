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
}) {
  const [finishedTyping, setFinishedTyping] = useState(false);

  useEffect(() => {
    console.log(searchText);

    setFinishedTyping(false);

    if (searchText) {
      setTimeout(() => {
        setFinishedTyping(true);
      }, 500);
    } else {
      setTimeout(() => {
        setFinishedTyping(true);
      }, 100);
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
        console.log(res);
        setSearchResultsData(res);
        // refs.page.current++;
      });
    } else if (finishedTyping && !searchText) {
      setSearchResultsData([]);
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
    if (!expand) setExpand(true);
  }

  return (
    <section className={styles.Search}>
      {!expand ? (
        <SearchBar
          handleChange={handleChange}
          expandSearch={expandSearch}
          handleClick={handleClick}
          searchText={searchText}
        />
      ) : (
        <SearchResults
          setFilmClicked={setFilmClicked}
          searchResultsData={searchResultsData}
          handleChange={handleChange}
          expandSearch={expandSearch}
          handleClick={handleClick}
        />
      )}
    </section>
  );
}
