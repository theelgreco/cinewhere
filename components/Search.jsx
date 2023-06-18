import SearchBar from "./subcomponents/SearchBar";
import SearchResults from "./SearchResults";
import SearchSelect from "./subcomponents/SearchSelect";
import Settings from "./Settings";
import styles from "@/styles/Search.module.css";
import { searchMovies } from "api";
import { useState, useEffect } from "react";
import { getRegions, getLanguages } from "api";

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
  options,
  setOptions,
  setOptionsClicked,
  settings,
  setSettings,
  rowSize,
}) {
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [regions, setRegions] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [focus, setFocus] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");

  useEffect(() => {
    getRegions().then((res) => {
      setRegions(res);
    });
    getLanguages().then((res) => {
      setLanguages(res);
    });
  }, []);

  useEffect(() => {
    expand ? setFocus(true) : setFocus(null);
  }, [expand]);

  useEffect(() => {
    setFinishedTyping(false);

    setTimeout(() => {
      setFinishedTyping(true);
    }, 1200);
  }, [searchText]);

  useEffect(() => {
    if (finishedTyping && searchText && searchText !== prevSearch) {
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
        setPrevSearch(searchText);
        refs.searchResultsPage.current++;
      });
    } else if (finishedTyping && !searchText) {
      setSearchResultsData([]);
      setPrevSearch("");
      setFinishedTyping(false);
    }
  }, [finishedTyping]);

  function handleChange(e) {
    setSearchResultsData([]);
    if (noResults) setNoResults(false);
    setSearchText(e.target.value);
  }

  function expandSearch(e) {
    if (!expand) {
      setExpand(true);
    }
  }

  function closeSearch(e) {
    refs.close.current.style.display = "none";
    setSearchResultsData([]);
    setSearchText("");
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

  return (
    <section className={styles.Search}>
      <>
        <SearchBar
          handleChange={handleChange}
          focus={focus}
          refs={refs}
          searchText={searchText}
          closeSearch={closeSearch}
          expandSearch={expandSearch}
        />
        {!expand ? (
          <>
            <SearchSelect
              regions={regions}
              languages={languages}
              options={options}
              setOptions={setOptions}
              setOptionsClicked={setOptionsClicked}
            />
            <Settings settings={settings} setSettings={setSettings} />
          </>
        ) : (
          <SearchResults
            setFilmClicked={setFilmClicked}
            searchResultsData={searchResultsData}
            refs={refs}
            searchClosed={searchClosed}
            expand={expand}
            setSearchClosed={setSearchClosed}
            setSearchResultsData={setSearchResultsData}
            searchText={searchText}
            noResults={noResults}
            options={options}
            closeSearch={closeSearch}
            rowSize={rowSize}
          />
        )}
      </>
    </section>
  );
}
