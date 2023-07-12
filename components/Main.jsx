import Search from "./Search";
import Services from "./Services";
import Genres from "./Genres";
import Type from "./Type";
import Movies from "./Movies";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Main({
  isMobile,
  searchText,
  setSearchText,
  selectedServices,
  setSelectedServices,
  data,
  setData,
  filmClicked,
  setFilmClicked,
  selectedGenres,
  setSelectedGenres,
  refs,
  setRefs,
  servicesList,
  setServicesList,
  genreList,
  setGenreList,
  searchResultsData,
  setSearchResultsData,
  expand,
  setExpand,
  searchClosed,
  setSearchClosed,
  options,
  setOptions,
  sort,
  setSort,
  order,
  setOrder,
  media_type,
  set_media_type,
  settings,
  setSettings,
}) {
  const [divToScroll, setDivToScroll] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseMoving, setMouseMoving] = useState(false);
  const [genreIdToSearch, setGenreIdToSearch] = useState({});
  const [serviceIdToSearch, setServiceIdToSearch] = useState({});
  const [clicked, setClicked] = useState(false);
  const [optionsClicked, setOptionsClicked] = useState(false);
  const [rowSize, setRowSize] = useState(returnRowSize(window.innerWidth));

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseUp);
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
    });
    window.addEventListener("resize", () => {
      setRowSize(returnRowSize(window.innerWidth), window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setRowSize(returnRowSize(window.innerWidth), window.innerWidth);
      });
    };
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

  function handleMouseDown(e) {
    setMouseDown(true);
    setMouseX(e.clientX);

    if (e.target.id === "Services") {
      setDivToScroll(e.target.parentElement);
    } else {
      setDivToScroll(e.target.parentElement.parentElement);
    }
  }

  function handleMouseMove(e) {
    if (mouseDown) {
      setMouseMoving(true);

      if (e.clientX < mouseX) {
        divToScroll.scrollLeft += (mouseX - e.clientX) / 2;
      } else if (e.clientX > mouseX) {
        divToScroll.scrollLeft -= (e.clientX - mouseX) / 2;
      }
    }

    setMouseX(e.clientX);
  }

  function handleMouseUp() {
    setMouseDown(false);

    setTimeout(() => {
      setMouseMoving(false);
    }, 4);
  }

  return (
    <main
      className={styles.Home}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        isMobile={isMobile}
        setFilmClicked={setFilmClicked}
        searchResultsData={searchResultsData}
        setSearchResultsData={setSearchResultsData}
        refs={refs}
        expand={expand}
        setExpand={setExpand}
        searchClosed={searchClosed}
        setSearchClosed={setSearchClosed}
        options={options}
        setOptions={setOptions}
        setOptionsClicked={setOptionsClicked}
        setSettings={setSettings}
        settings={settings}
        rowSize={rowSize}
      />
      <Services
        isMobile={isMobile}
        setDivToScroll={setDivToScroll}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        mouseMoving={mouseMoving}
        divToScroll={divToScroll}
        handleMouseDown={handleMouseDown}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        servicesList={servicesList}
        setServicesList={setServicesList}
        setServiceIdToSearch={setServiceIdToSearch}
        clicked={clicked}
        setClicked={setClicked}
        refs={refs}
      />
      <Genres
        isMobile={isMobile}
        setDivToScroll={setDivToScroll}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        mouseMoving={mouseMoving}
        divToScroll={divToScroll}
        handleMouseDown={handleMouseDown}
        setGenreIdToSearch={setGenreIdToSearch}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genreList={genreList}
        setGenreList={setGenreList}
        clicked={clicked}
        setClicked={setClicked}
        media_type={media_type}
      />
      <Type
        isMobile={isMobile}
        media_type={media_type}
        set_media_type={set_media_type}
        options={options}
        setOptions={setOptions}
        setOptionsClicked={setOptionsClicked}
        setSelectedGenres={setSelectedGenres}
        setGenreList={setGenreList}
      />
      <Movies
        isMobile={isMobile}
        selectedServices={selectedServices}
        data={data}
        setData={setData}
        filmClicked={filmClicked}
        setFilmClicked={setFilmClicked}
        selectedGenres={selectedGenres}
        setGenreIdToSearch={setGenreIdToSearch}
        genreIdToSearch={genreIdToSearch}
        serviceIdToSearch={serviceIdToSearch}
        setServiceIdToSearch={setServiceIdToSearch}
        setSelectedGenres={setSelectedGenres}
        refs={refs}
        setRefs={setRefs}
        options={options}
        setOptions={setOptions}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        clicked={clicked}
        setClicked={setClicked}
        media_type={media_type}
        optionsClicked={optionsClicked}
        setOptionsClicked={setOptionsClicked}
        settings={settings}
        rowSize={rowSize}
        setGenreList={setGenreList}
        set_media_type={set_media_type}
      />
    </main>
  );
}
