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

  useEffect(() => {
    getRegions().then((res) => {
      setRegions(res);
    });
    getLanguages().then((res) => {
      setLanguages(res);
    });
  }, []);

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
      <>
        <SearchBar handleChange={handleChange} expandSearch={expandSearch} />
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
            options={options}
            rowSize={rowSize}
          />
        )}
      </>
    </section>
  );
}
