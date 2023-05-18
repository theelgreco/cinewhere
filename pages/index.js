import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import servicesArray from "constants/services";
import genres from "constants/genres";
import Main from "@/components/Main";
import MovieInfo from "@/components/subcomponents/MovieInfo";

export default function Home() {
  const [isMobile, setIsMobile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState([]);
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [filmClicked, setFilmClicked] = useState(false);
  const [country, setCountry] = useState("gb");
  const [servicesList, setServicesList] = useState([...servicesArray]);
  const [genreList, setGenreList] = useState([...genres]);
  const [expand, setExpand] = useState(false);
  const [searchClosed, setSearchClosed] = useState(true);
  const [refs, setRefs] = useState({});
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [options, setOptions] = useState({});

  useEffect(() => {
    setIsMobile(window.matchMedia("(any-pointer:coarse)").matches);

    if (!Object.keys(refs).length) {
      const refsObject = {};
      genres.forEach((genre) => {
        refsObject[genre.id] = React.createRef();
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
              genreData={genreData}
              setGenreData={setGenreData}
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
