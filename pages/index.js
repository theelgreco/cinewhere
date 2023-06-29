import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Script from "next/script";
import { todaysDate } from "utils/utils";
import servicesArray from "constants/services";
import { movieGenres, tvGenres, genreIds } from "constants/genres";
import Main from "@/components/Main";
import MovieInfo from "@/components/subcomponents/MovieInfo";
import Privacy from "@/components/Privacy";
import Head from "next/head";

export default function Home() {
  const [isMobile, setIsMobile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState([]);
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [filmClicked, setFilmClicked] = useState(false);
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
    "primary_release_date.lte": todaysDate.date,
    "primary_release_date.gte": "1900-01-01",
    "first_air_date.lte": todaysDate.date,
    "first_air_date.gte": "1900-01-01",
    "with_runtime.gte": 0,
    "vote_average.lte": 10,
    "vote_average.gte": 0,
  });
  const [media_type, set_media_type] = useState("movie");
  const [settings, setSettings] = useState({ autoplay: false });
  const [rowSize, setRowSize] = useState(returnRowSize(window.innerWidth));

  useEffect(() => {
    setIsMobile(window.matchMedia("(any-pointer:coarse)").matches);

    window.addEventListener("resize", () => {
      setRowSize(returnRowSize(window.innerWidth), window.innerWidth);
    });

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
      refsObject.close = React.createRef();
      refsObject.services = React.createRef();

      setRefs(refsObject);
    }
  }, []);

  function returnRowSize(width) {
    if (width > 1499) return 7;
    else if (width > 1149) return 6;
    else if (width > 899) return 5;
    else if (width > 599) return 4;
    else if (width > 449) return 3;
    else if (width > 229) return 2;
    else return 1;
  }

  return (
    <BrowserRouter>
      <Head>
        <title>
          Discover where you can watch your favourite movies and tv shows
        </title>
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, interactive-widget=overlays-content"
        />
        <link rel="icon" type="image/svg" href="/icon.svg"></link>
        <link rel="manifest" href="/manifest.json"></link>
        <Script src="./register-sw.js" strategy="beforeInteractive" />
        <Script src="./install-sw.js" strategy="beforeInteractive" />
        <Script src="./fetch-sw.js" strategy="beforeInteractive" />
        <Script src="./activate-sw.js" strategy="beforeInteractive" />
      </Head>
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
              settings={settings}
              setSettings={setSettings}
              rowSize={rowSize}
            />
          }
        />
        <Route
          path="/:media_type/:imdb_id"
          element={<MovieInfo options={options} />}
        />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}
