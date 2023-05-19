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
  country,
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
}) {
  const [divToScroll, setDivToScroll] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseMoving, setMouseMoving] = useState(false);
  const [genreIdToSearch, setGenreIdToSearch] = useState({});
  const [serviceIdToSearch, setServiceIdToSearch] = useState({});
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseUp);
  }, []);

  function handleMouseDown(e) {
    setMouseDown(true);
    setMouseX(e.clientX);

    if (e.target.id === "Services" || e.target.id === "Services") {
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
      />
      <Type isMobile={isMobile} />
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
        country={country}
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
      />
    </main>
  );
}
