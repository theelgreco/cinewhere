import styles from "@/styles/SearchResults.module.css";
import MovieCard from "./subcomponents/MovieCard";
import SearchBar from "./subcomponents/SearchBar";
import clsx from "clsx";

import { useEffect, useState } from "react";

export default function SearchResults({
  setFilmClicked,
  searchResultsData,
  handleChange,
  expandSearch,
  handleClick,
}) {
  return (
    <div className={styles.SearchResults}>
      <div className={styles.searchBar}>
        <SearchBar
          handleChange={handleChange}
          expandSearch={expandSearch}
          handleClick={handleClick}
          focus={true}
        />
      </div>
      {searchResultsData && searchResultsData.length ? (
        <div className={styles.flexContainer}>
          {searchResultsData.map((film) => {
            return (
              <MovieCard
                setFilmClicked={setFilmClicked}
                film={film}
                data={searchResultsData}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
