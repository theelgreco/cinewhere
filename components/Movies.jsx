import { getFilmsTmdb } from "api";
import { filterData } from "utils/utils";
import clsx from "clsx";
import styles from "@/styles/Movies.module.css";
import GenreMovies from "./GenreMovies";
import ServiceMovies from "./ServiceMovies";
import { useEffect, useState } from "react";
import React from "react";

export default function Movies({
  isMobile,
  selectedServices,
  data,
  setData,
  filmClicked,
  setFilmClicked,
  genreIdToSearch,
  setGenreIdToSearch,
  serviceIdToSearch,
  setServiceIdToSearch,
  selectedGenres,
  setSelectedGenres,
  refs,
  options,
  setOptions,
  sort,
  setSort,
  order,
  setOrder,
  setClicked,
  media_type,
  optionsClicked,
  setOptionsClicked,
  settings,
  rowSize,
  setGenreList,
  set_media_type,
}) {
  const [collapsedMenus, setCollapsedMenus] = useState(false);
  const [trailerRow, setTrailerRow] = useState(null);
  const [atBottom, setAtBottom] = useState(false);
  // const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (filmClicked) return;
    // prettier-ignore
    if(!Object.keys(genreIdToSearch).length && !Object.keys(serviceIdToSearch).length) return;

    // prettier-ignore
    // execute if a genre is added
    if (genreIdToSearch.add) {
      console.log('here')
      let params = {
        page: 1,
        with_genres: genreIdToSearch.id,
        ...options,
      };

      //prettier-ignores
      if (selectedServices.length) params["with_watch_providers"] = selectedServices.join("|");

      getFilmsTmdb(params, media_type).then((res) => {
        const genreDataCopy = [...selectedGenres];
        const indexOfGenre = genreDataCopy.findIndex(
          (el) => el.id === genreIdToSearch.id
        );
        genreDataCopy[indexOfGenre].movies = res;
        genreDataCopy[indexOfGenre].page = 1;
        setSelectedGenres(genreDataCopy);
        setClicked(false);
      });
      setGenreIdToSearch({});
    }
    // execute if a service is clicked with genres selected
    else if (Object.keys(serviceIdToSearch).length && selectedGenres.length) {
      console.log('here')
      selectedGenres.forEach((genre) => {
        if (refs[genre.id].current) {
          refs[genre.id].current.scrollLeft = 0;
        }
      });

      const genreDataCopy = [...selectedGenres];

      genreDataCopy.forEach((genre) => {
        genre.movies = [];
        setSelectedGenres(genreDataCopy);
      });

      const fetchData = async () => {
        for (const [index, genre] of genreDataCopy.entries()) {
          let params = {
            page: 1,
            with_genres: genre.id,
            ...options,
          };

          //prettier-ignore
          if(selectedServices.length) params["with_watch_providers"] = selectedServices.join("|")

          const res = await getFilmsTmdb(params, media_type);
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;

          if (index === genreDataCopy.length - 1) {
            setSelectedGenres(genreDataCopy);
            setServiceIdToSearch({});
            setClicked(false);
          }
        }
      };

      fetchData();
    }
    // only execute if a service has been clicked with no genres selected or if the last genre has been removed with services still selected
    else if ((Object.keys(genreIdToSearch).length || Object.keys(serviceIdToSearch).length) && selectedServices.length && !selectedGenres.length) {
      console.log('here')
      setData([]);
      refs.sectionRef.current.scrollTop = 0;
      refs.page.current = 1;
      let params = {
        page: 1,
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
        ...options,
      };
      getFilmsTmdb(params, media_type).then((res) => {
        setData(res);
        refs.page.current++;
        setClicked(false)
        if(refs.sectionRef.current.scrollHeight === refs.sectionRef.current.offsetHeight) setAtBottom(true)
      });
      setServiceIdToSearch({})
      setGenreIdToSearch({})
    }

    else {
      console.log('here')
      setData([])
      setServiceIdToSearch({})
      setGenreIdToSearch({})
      setClicked(false)
    }

    setFilmClicked(false);
  }, [genreIdToSearch, serviceIdToSearch]);

  useEffect(() => {
    if (filmClicked || !optionsClicked) return;

    if (selectedGenres.length) {
      selectedGenres.forEach((genre) => {
        if (refs[genre.id].current) {
          refs[genre.id].current.scrollLeft = 0;
        }
      });

      const genreDataCopy = [...selectedGenres];

      genreDataCopy.forEach((genre) => {
        genre.movies = [];
      });

      const fetchData = async () => {
        for (const [index, genre] of genreDataCopy.entries()) {
          let params = {
            page: 1,
            with_genres: genre.id,
            ...options,
          };

          //prettier-ignore
          if(selectedServices.length) params["with_watch_providers"] = selectedServices.join("|")

          const res = await getFilmsTmdb(params, media_type);
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;

          if (index === genreDataCopy.length - 1) {
            setSelectedGenres(genreDataCopy);
          }
        }
      };

      fetchData();
    } else if (selectedServices.length) {
      setData([]);
      refs.sectionRef.current.scrollTop = 0;
      refs.page.current = 1;
      let params = {
        page: 1,
        with_watch_providers: selectedServices.join("|"),
        ...options,
      };
      getFilmsTmdb(params, media_type).then((res) => {
        setData(res);
        refs.page.current++;
        if (
          refs.sectionRef.current.scrollHeight ===
          refs.sectionRef.current.offsetHeight
        )
          setAtBottom(true);
      });
      // setServiceIdToSearch({});
      // setGenreIdToSearch({});
    }

    setOptionsClicked(false);
  }, [optionsClicked]);

  /* FILTER FUNCTION */
  // useEffect(() => {
  //   if (data.length) {
  //     filterData(data, media_type, options.watch_region).then(
  //       (filteredData) => {
  //         setFiltered(filteredData);
  //       }
  //     );
  //   }
  // }, [data]);

  return (
    <>
      <button
        className={clsx(styles.collapseBtn, {
          [styles.collapseBtnExpanded]: !collapsedMenus,
          [styles.collapseBtnCollapsed]: collapsedMenus,
        })}
        onClick={() => {
          !collapsedMenus ? setCollapsedMenus(true) : setCollapsedMenus(false);
        }}>
        <img
          src="/svg/uparrow.svg"
          className={clsx(styles.arrow, {
            [styles.up]: !collapsedMenus,
            [styles.down]: collapsedMenus,
          })}
        />
      </button>
      {selectedGenres.length ? (
        <GenreMovies
          collapsedMenus={collapsedMenus}
          setCollapsedMenus={setCollapsedMenus}
          refs={refs}
          options={options}
          setOptions={setOptions}
          sort={sort}
          setSort={setSort}
          order={order}
          setOrder={setOrder}
          optionsClicked={optionsClicked}
          setOptionsClicked={setOptionsClicked}
          selectedGenres={selectedGenres}
          setFilmClicked={setFilmClicked}
          settings={settings}
          isMobile={isMobile}
          setSelectedGenres={setSelectedGenres}
          selectedServices={selectedServices}
          media_type={media_type}
          set_media_type={set_media_type}
          setGenreList={setGenreList}
        />
      ) : (
        <ServiceMovies
          collapsedMenus={collapsedMenus}
          setCollapsedMenus={setCollapsedMenus}
          refs={refs}
          options={options}
          setOptions={setOptions}
          sort={sort}
          setSort={setSort}
          order={order}
          setOrder={setOrder}
          optionsClicked={optionsClicked}
          setOptionsClicked={setOptionsClicked}
          data={data}
          isMobile={isMobile}
          setFilmClicked={setFilmClicked}
          settings={settings}
          trailerRow={trailerRow}
          setTrailerRow={setTrailerRow}
          selectedServices={selectedServices}
          rowSize={rowSize}
          setData={setData}
          media_type={media_type}
          setClicked={setClicked}
          setServiceIdToSearch={setServiceIdToSearch}
          setGenreIdToSearch={setGenreIdToSearch}
          setGenreList={setGenreList}
          set_media_type={set_media_type}
          setSelectedGenres={setSelectedGenres}
          atBottom={atBottom}
          setAtBottom={setAtBottom}
        />
      )}
    </>
  );
}
