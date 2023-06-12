import SearchBar from "./subcomponents/SearchBar";
import SearchResults from "./SearchResults";
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

  function handleSelect(e) {
    console.log({ [e.target.id]: e.target.value });
    setOptions({
      ...options,
      [e.target.id]: e.target.value,
    });
    setOptionsClicked(true)
  }

  return (
    <section className={styles.Search}>
      {!expand ? (
        <>
          <div className={styles.selectFlex}>
            <select
              id="watch_region"
              className={styles.regionSelect}
              onChange={handleSelect}
              value={options.watch_region}>
              {regions ? (
                regions.map((region) => {
                  return (
                    <option key={region.iso_3166_1} value={region.iso_3166_1}>
                      {region.english_name}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
            <select
              id="with_original_language"
              className={styles.languageSelect}
              onChange={handleSelect}
              value={options.with_original_language}>
              {languages ? (
                languages.map((lang, index) => {
                  return (
                    <option key={lang.iso_639_1} value={lang.iso_639_1}>
                      {index === 0
                        ? `${lang.name}`
                        : `(${lang.iso_639_1.toUpperCase()}) ${lang.name}`}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </div>
          <SearchBar handleChange={handleChange} expandSearch={expandSearch} />
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
        />
      )}
    </section>
  );
}
