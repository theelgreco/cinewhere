import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import servicesArray from "constants/services";
import { movieGenres, tvGenres, genreIds } from "constants/genres";
import Main from "@/components/Main";
import MovieInfo from "@/components/subcomponents/MovieInfo";

export default function Home() {
  const [isMobile, setIsMobile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState([]);
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [filmClicked, setFilmClicked] = useState(false);
  const [country, setCountry] = useState("gb");
  const [servicesList, setServicesList] = useState([...servicesArray]);
  const [genreList, setGenreList] = useState([...movieGenres]);
  const [expand, setExpand] = useState(false);
  const [searchClosed, setSearchClosed] = useState(true);
  const [refs, setRefs] = useState({});
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [options, setOptions] = useState({
    watch_region: "GB",
    with_original_language: "en",
    with_watch_monetization_types: "",
  });
  const [media_type, set_media_type] = useState("movie");

  useEffect(() => {
    setIsMobile(window.matchMedia("(any-pointer:coarse)").matches);

    if (!Object.keys(refs).length) {
      const refsObject = {};
      genreIds.forEach((genre) => {
        refsObject[genre] = React.createRef();
      });
      refsObject.sectionRefGenre = React.createRef();
      refsObject.scrollHeightGenre = React.createRef();
      refsObject.sectionRef = React.createRef();
      refsObject.scrollHeight = React.createRef();
      refsObject.page = React.createRef();
      refsObject.page.current = 1;
      refsObject.searchResultsPage = React.createRef();
      refsObject.searchResultsPage.current = 1;
      refsObject.expandedSearch = React.createRef();
      refsObject.search = React.createRef();

      setRefs(refsObject);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isMobile={isMobile}
              searchText={searchText}
              setSearchText={setSearchText}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              data={data}
              setData={setData}
              filmClicked={filmClicked}
              setFilmClicked={setFilmClicked}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              country={country}
              refs={refs}
              setRefs={setRefs}
              servicesList={servicesList}
              setServicesList={setServicesList}
              genreList={genreList}
              setGenreList={setGenreList}
              searchResultsData={searchResultsData}
              setSearchResultsData={setSearchResultsData}
              expand={expand}
              setExpand={setExpand}
              searchClosed={searchClosed}
              setSearchClosed={setSearchClosed}
              options={options}
              setOptions={setOptions}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
              media_type={media_type}
              set_media_type={set_media_type}
            />
          }
        />
        <Route
          path="/:media_type/:imdb_id"
          element={<MovieInfo country={country} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
