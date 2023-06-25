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
}) {
  const [collapsedMenus, setCollapsedMenus] = useState(false);
  const [trailerRow, setTrailerRow] = useState(null);
  // const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    //prettier-ignore
    // only execute if a service has been clicked with no genres selected or if the last genre has been removed with services still selected
    if ((Object.keys(serviceIdToSearch).length || (Object.keys(genreIdToSearch).length && !genreIdToSearch.add)) && (selectedServices.length && !selectedGenres.length && !filmClicked)) {
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
        });
        setServiceIdToSearch({})
        setGenreIdToSearch({})
    }

    //prettier-ignore
    // only execute if a service has been clicked with genres selected
    if (Object.keys(serviceIdToSearch).length && selectedServices.length && selectedGenres.length && !filmClicked) {
      selectedGenres.forEach((genre) => {
        if (refs[genre.id].current) {
          refs[genre.id].current.scrollLeft = 0;
        }
      });

      const genreDataCopy = [...selectedGenres];
      genreDataCopy.forEach((genre, index) => {
        genre.movies = [];
        // setSelectedGenres(genreDataCopy);
        let params = {
          page: 1,
          with_watch_monetization_types: "flatrate",
          with_watch_providers: selectedServices.join("|"),
          with_genres: genre.id,
          ...options,
        };
        getFilmsTmdb(params, media_type).then((res) => {
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;
          // setSelectedGenres(genreDataCopy);
          if(index === genreDataCopy.length - 1){
            setClicked(false)
            setSelectedGenres(genreDataCopy);
          }
        });
      });
      setServiceIdToSearch({})
    }

    //prettier-ignore
    // only execute if the last service has been removed with genres selected
    if (Object.keys(serviceIdToSearch).length && !selectedServices.length && selectedGenres.length && !filmClicked){
      selectedGenres.forEach((genre) => {
        if (refs[genre.id].current) {
          refs[genre.id].current.scrollLeft = 0;
        }
      });

      const genreDataCopy = [...selectedGenres];
      genreDataCopy.forEach((genre, index) => {
        genre.movies = [];
        setSelectedGenres(genreDataCopy);
        let params = {
          page: 1,
          with_watch_monetization_types: "flatrate",
          with_genres: genre.id,
          ...options,
        };
        getFilmsTmdb(params, media_type).then((res) => {
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;
          setSelectedGenres(genreDataCopy);
          if(index === genreDataCopy.length - 1) setClicked(false)
        });
      });
      setServiceIdToSearch({})
    }

    //prettier-ignore
    // only execute if the last service has been removed with no genres selected or if the last genre has been removed with no services selected
    if((Object.keys(serviceIdToSearch).length || (Object.keys(genreIdToSearch).length && !genreIdToSearch.add)) && (!selectedServices.length && !selectedGenres.length && !filmClicked)) {
      setData([])
      setServiceIdToSearch({})
      setGenreIdToSearch({})
      setClicked(false)
    }

    //prettier-ignore
    // only execute if a genre has been added with services selected
    if (Object.keys(genreIdToSearch).length && genreIdToSearch.add && selectedServices.length && !filmClicked) {
      console.log('hererer')
      let params = {
        page: 1,
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
        with_genres: genreIdToSearch.id,
        ...options,
      };
      getFilmsTmdb(params, media_type).then((res) => {
        const genreDataCopy = [...selectedGenres];
        const indexOfGenre = genreDataCopy.findIndex(
          (el) => el.id === genreIdToSearch.id
        );
        genreDataCopy[indexOfGenre].movies = res;
        genreDataCopy[indexOfGenre].page = 1;
        setSelectedGenres(genreDataCopy);
        setClicked(false)
      });
      setGenreIdToSearch({});
    }

    //prettier-ignore
    // only execute if a genre has been added with no services selected
    if (Object.keys(genreIdToSearch).length && genreIdToSearch.add && !selectedServices.length && !filmClicked){
      let params = {
        page: 1,
        with_watch_monetization_types: "flatrate",
        with_genres: genreIdToSearch.id,
        ...options,
      };
      getFilmsTmdb(params, media_type).then((res) => {
        const genreDataCopy = [...selectedGenres];
        const indexOfGenre = genreDataCopy.findIndex(
          (el) => el.id === genreIdToSearch.id
        );
        genreDataCopy[indexOfGenre].movies = res;
        genreDataCopy[indexOfGenre].page = 1;
        setSelectedGenres(genreDataCopy);
        setClicked(false)
      });
      setGenreIdToSearch({});
    }

    setFilmClicked(false);
  }, [genreIdToSearch, serviceIdToSearch]);

  useEffect(() => {
    if (optionsClicked) {
      if (!selectedServices.length && !selectedGenres.length && !filmClicked) {
        setData([]);
        refs.sectionRef.current.scrollTop = 0;
        refs.page.current = 1;
        let params = {
          page: 1,
          ...options,
        };
        getFilmsTmdb(params, media_type).then((res) => {
          setData(res);
          refs.page.current++;
        });
      }

      //prettier-ignore
      //only execute if options are updated and there are services selected but no genres selected
      if(selectedServices.length && !selectedGenres.length && !filmClicked) {
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
        });
        setServiceIdToSearch({})
        setGenreIdToSearch({})
      }

      //prettier-ignore
      //only execute if options are updated and there are genres selected but no services selected
      if(!selectedServices.length && selectedGenres.length && !filmClicked){
      selectedGenres.forEach((genre) => {
        if (refs[genre.id].current) {
          refs[genre.id].current.scrollLeft = 0;
        }
      });

      const genreDataCopy = [...selectedGenres];
      genreDataCopy.forEach((genre) => {
        genre.movies = [];
        setSelectedGenres(genreDataCopy);
        let params = {
          page: 1,
          with_watch_monetization_types: "flatrate",
          with_genres: genre.id,
          ...options,
        };
        getFilmsTmdb(params, media_type).then((res) => {
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;
          setSelectedGenres(genreDataCopy);
        });
      });
      }

      //prettier-ignore
      //only execute if options are updated and there are both genres and services selected
      if(selectedServices.length && selectedGenres.length && !filmClicked){
      selectedGenres.forEach((genre) => {
        if (refs[genre.id].current) {
          refs[genre.id].current.scrollLeft = 0;
        }
      });

      const genreDataCopy = [...selectedGenres];
      genreDataCopy.forEach((genre) => {
        genre.movies = [];
        setSelectedGenres(genreDataCopy);
        let params = {
          page: 1,
          with_watch_monetization_types: "flatrate",
          with_watch_providers: selectedServices.join("|"),
          with_genres: genre.id,
          ...options,
        };
        getFilmsTmdb(params, media_type).then((res) => {
          const indexOfGenre = genreDataCopy.findIndex(
            (el) => el.id === genre.id
          );
          genreDataCopy[indexOfGenre].movies = res;
          genreDataCopy[indexOfGenre].page = 1;
          setSelectedGenres(genreDataCopy);
        });
      });
      }

      setOptionsClicked(false);
    }
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
        />
      )}
    </>
  );
}
