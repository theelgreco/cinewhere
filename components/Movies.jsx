import SortBy from "./subcomponents/SortBy";
import { getFilmsTmdb } from "api";
import { filterData } from "utils/utils";
import { updateRows } from "utils/utils";
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
  const [atBottom, setAtBottom] = useState(false);
  const [genreScroll, setGenreScroll] = useState({ atEnd: false, id: null });
  const [collapsedMenus, setCollapsedMenus] = useState(false);
  const [trailerRow, setTrailerRow] = useState(null);
  const [rowsObject, setRowsObject] = useState({});
  // const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!selectedGenres.length && data.length) {
      refs.sectionRef.current.scrollTop = refs.scrollHeight.current;
    } else if (selectedGenres.length) {
      refs.sectionRefGenre.current.scrollTop = refs.scrollHeightGenre.current;
    }

    selectedGenres.forEach((genre) => {
      if (genre.scrollLeft) {
        refs[genre.id].current.scrollLeft = genre.scrollLeft;
      }
    });
  }, []);

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

  useEffect(() => {
    if (atBottom) {
      let params = {
        page: refs.page.current,
        watch_region: "GB",
        with_watch_monetization_types: "flatrate",
        with_watch_providers: selectedServices.join("|"),
        ...options,
      };
      getFilmsTmdb(params, media_type).then((res) => {
        setData([...data, ...res]);
        refs.page.current++;
        setAtBottom(false);
      });
    }

    if (genreScroll.atEnd) {
      selectedGenres.forEach((genre) => {
        if (String(genre.id) === genreScroll.id) {
          console.log(genre);
          let params = {
            page: genre.page + 1,
            watch_region: "GB",
            with_watch_monetization_types: "flatrate",
            with_watch_providers: selectedServices.join("|"),
            with_genres: genre.id,
            ...options,
          };
          getFilmsTmdb(params, media_type).then((res) => {
            const genreDataCopy = [...selectedGenres];
            const indexOfGenre = genreDataCopy.findIndex(
              (el) => el.id === genre.id
            );
            //prettier-ignore
            genreDataCopy[indexOfGenre].movies = [...genreDataCopy[indexOfGenre].movies, ...res];
            genreDataCopy[indexOfGenre].page++;
            setSelectedGenres(genreDataCopy);
            setGenreScroll({ atEnd: false, id: null });
          });
        }
      });
    }
  }, [atBottom, genreScroll]);

  useEffect(() => {
    if (data.length) {
      let rowsObjectCopy = { ...rowsObject };
      setRowsObject(updateRows(data, rowSize, rowsObjectCopy));
    }
  }, [rowSize, data]);

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

  function handleScroll(e) {
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    //prettier-ignore
    if (scrollTop > scrollHeight - clientHeight - 450 && !atBottom && e.target.id === "sectionRef") {
      setAtBottom(true);
    }

    if (e.target.id === "sectionRef") {
      refs.scrollHeight.current = scrollTop;
    } else if (e.target.id === "sectionRefGenre") {
      refs.scrollHeightGenre.current = scrollTop;
    }
  }

  function handleGenreScroll(e) {
    const genresCopy = [...selectedGenres];

    const scrollWidth = e.target.scrollWidth;
    const clientWidth = e.target.clientWidth;
    const scrollLeft = e.target.scrollLeft;

    if (scrollLeft > scrollWidth - clientWidth - 450 && !genreScroll.atEnd) {
      setGenreScroll({ atEnd: true, id: e.target.id });
    }

    genresCopy.map((genre) => {
      if (String(genre.id) === e.target.id) {
        genre.scrollLeft = scrollLeft;
      }
    });
  }

  function handleClick(e) {
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
      setClicked(false);
    });
    setServiceIdToSearch({});
    setGenreIdToSearch({});
  }

  if (selectedGenres.length) {
    return (
      <GenreMovies
        collapsedMenus={collapsedMenus}
        setCollapsedMenus={setCollapsedMenus}
        handleScroll={handleScroll}
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
        handleGenreScroll={handleGenreScroll}
        setFilmClicked={setFilmClicked}
        settings={settings}
        isMobile={isMobile}
      />
    );
  } else {
    return (
      <ServiceMovies
        collapsedMenus={collapsedMenus}
        setCollapsedMenus={setCollapsedMenus}
        handleScroll={handleScroll}
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
        rowsObject={rowsObject}
        trailerRow={trailerRow}
        setTrailerRow={setTrailerRow}
        selectedServices={selectedServices}
        rowSize={rowSize}
        handleClick={handleClick}
      />
    );
  }
}
