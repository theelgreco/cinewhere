import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "@/styles/Home.module.css";
import Main from "@/components/Main";
import MovieInfo from "@/components/subcomponents/MovieInfo";

export default function Home() {
  const [isMobile, setIsMobile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [filmClicked, setFilmClicked] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [country, setCountry] = useState("gb");
  const scrollHeight = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    setIsMobile(window.matchMedia("(any-pointer:coarse)").matches);
  }, []);

  return (
    <BrowserRouter>
      <main className={styles.Home}>
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
                scrollHeight={scrollHeight}
                sectionRef={sectionRef}
                nextPage={nextPage}
                setNextPage={setNextPage}
                genreData={genreData}
                setGenreData={setGenreData}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                country={country}
              />
            }
          />
          <Route
            path="/movies/:imdb_id"
            element={<MovieInfo country={country} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
