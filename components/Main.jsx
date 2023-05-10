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
  scrollHeight,
  sectionRef,
  nextPage,
  setNextPage,
  selectedGenres,
  setSelectedGenres,
  genreData,
  setGenreData,
  country,
}) {
  const [divToScroll, setDivToScroll] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseMoving, setMouseMoving] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [genreIdToSearch, setGenreIdToSearch] = useState(null);

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
      />
      <Type isMobile={isMobile} />
      <Movies
        isMobile={isMobile}
        atBottom={atBottom}
        setAtBottom={setAtBottom}
        setSelectedServices={setSelectedServices}
        selectedServices={selectedServices}
        data={data}
        setData={setData}
        filmClicked={filmClicked}
        setFilmClicked={setFilmClicked}
        scrollHeight={scrollHeight}
        sectionRef={sectionRef}
        nextPage={nextPage}
        setNextPage={setNextPage}
        selectedGenres={selectedGenres}
        setGenreIdToSearch={setGenreIdToSearch}
        genreIdToSearch={genreIdToSearch}
        genreData={genreData}
        setSelectedGenres={setSelectedGenres}
        country={country}
      />
    </main>
  );
}
