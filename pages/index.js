import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import MovieInfo from "@/components/subcomponents/MovieInfo";
import Search from "@/components/Search";
import Services from "@/components/Services";
import Genres from "@/components/Genres";
import Type from "@/components/Type";
import Movies from "@/components/Movies";
import axios from "axios";

export default function Home() {
  const [isMobile, setIsMobile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState({
    method: "GET",
    params: {
      country: "gb",
      output_language: "en",
    },
    headers: {
      //mine
      "X-RapidAPI-Key": "120295f81bmshef2922b0bc8ec70p1bf2acjsnf91e520d2110",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      //Zoe's
      // "X-RapidAPI-Key": "4a3a480da5mshc9cea72feeab0c6p15c1bfjsn3a198667740f",
      // "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  });
  const [divToScroll, setDivToScroll] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseMoving, setMouseMoving] = useState(false);
  const [path, setPath] = useState("/");
  const router = useRouter();
  const [filmFromUrl, setFilmFromUrl] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [noneSelected, setNoneSelected] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(any-pointer:coarse)").matches);
    document.addEventListener("mouseleave", handleMouseUp);
    setPath(router.asPath);
  }, []);

  useEffect(() => {
    if (path === "/") {
      setIsSelected(false);
      setNoneSelected(true);
    } else {
      const imdbId = router.asPath.slice(2);
      const newOptions = { ...options };
      newOptions.params.imdb_id = imdbId;
      newOptions.url =
        "https://streaming-availability.p.rapidapi.com/v2/get/basic";
      setOptions(newOptions);

      console.log(newOptions);
      axios.request(newOptions).then((res) => {
        setFilmFromUrl(res.data.result);
        setIsSelected(true);
        setNoneSelected(false);
        console.log(res);
      });
    }
  }, [path]);

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
        options={options}
        setOptions={setOptions}
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
        options={options}
        setOptions={setOptions}
      />
      <Genres
        isMobile={isMobile}
        setDivToScroll={setDivToScroll}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        mouseMoving={mouseMoving}
        divToScroll={divToScroll}
        handleMouseDown={handleMouseDown}
      />
      <Type isMobile={isMobile} />
      <Movies
        options={options}
        setOptions={setOptions}
        isMobile={isMobile}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        noneSelected={noneSelected}
        setNoneSelected={setNoneSelected}
        filmFromUrl={filmFromUrl}
      />
    </main>
  );
}
