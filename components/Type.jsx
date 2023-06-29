import styles from "@/styles/Type.module.css";
import ReleaseYearSlider from "@/subcomponents/ReleaseYearSlider";
import RatingSlider from "@/subcomponents/RatingSlider";
import RunningTimeSlider from "@/subcomponents/RunningTimeSlider";
import PriceMenu from "@/subcomponents/PriceMenu.jsx";
import ShowType from "@/subcomponents/ShowType";
import Popup from "@/subcomponents/Popup";
import { useRef, useState, useEffect } from "react";
import { movieGenres, tvGenres } from "constants/genres";
import { getAllDescendantElements } from "utils/utils";
import React from "react";
import { todaysDate } from "utils/utils";

export default function Type({
  isMobile,
  media_type,
  set_media_type,
  options,
  setOptions,
  setOptionsClicked,
  setSelectedGenres,
  setGenreList,
}) {
  const type = useRef();
  const Price = useRef();
  const ReleaseYear = useRef();
  const Rating = useRef();
  const Runtime = useRef();

  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuParent, setMenuParent] = useState(null);
  const [menuElements, setMenuElements] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    "Show Type": false,
    Price: false,
    "Release Year": false,
    Rating: false,
    Runtime: false,
  });

  useEffect(() => {
    const selectedFiltersCopy = { ...selectedFilters };

    //prettier-ignore
    if (options["primary_release_date.lte"] !== todaysDate.date || options["first_air_date.lte"] !== todaysDate.date || options["primary_release_date.gte"] !== "1900-01-01" || options["first_air_date.gte"] !== "1900-01-01") {
      selectedFiltersCopy["Release year"] = true;
    } else {
      selectedFiltersCopy["Release year"] = false;
    }

    if (options["with_watch_monetization_types"] !== "") {
      selectedFiltersCopy["Price"] = true;
    } else {
      selectedFiltersCopy["Price"] = false;
    }

    //prettier-ignore
    if (options["vote_average.lte"] !== 10 || options["vote_average.gte"] !== 0) {
      selectedFiltersCopy["Rating"] = true;
    } else {
      selectedFiltersCopy["Rating"] = false;
    }

    if (options["with_runtime.lte"]) {
      selectedFiltersCopy["Runtime"] = true;
    } else {
      selectedFiltersCopy["Runtime"] = false;
    }

    setSelectedFilters(selectedFiltersCopy);
  }, [options]);

  useEffect(() => {
    if (menuParent) {
      let temp = [];
      temp.push(
        menuParent,
        ...menuParent.children,
        ...getAllDescendantElements(menuParent.children[1], [])
      );
      setMenuElements(temp);
    }
  }, [menuParent]);

  useEffect(() => {
    if (menuElements.length) {
      document.addEventListener("mousedown", handleCloseMenu);
      return () => {
        document.removeEventListener("mousedown", handleCloseMenu);
      };
    }
  }, [menuElements]);

  function handleCloseMenu(e) {
    const clickedElement = e.target;
    const clickedOutsideMenu = !menuElements.includes(clickedElement);

    if (clickedOutsideMenu) {
      setSelectedMenu("");
      setMenuParent(null);
      setMenuElements([]);
    }
  }

  function handleClick(e) {
    let mediaObj = { movie: movieGenres, tv: tvGenres };

    set_media_type(e.target.id);

    setSelectedGenres([]);
    setGenreList(mediaObj[e.target.id]);

    setOptionsClicked(true);
  }

  function resetFilters() {
    const areFiltersSelected = Object.values(selectedFilters).filter(
      (x) => x
    ).length;

    if (areFiltersSelected) {
      const currentOptions = {
        ...options,
        with_watch_monetization_types: "",
        "primary_release_date.lte": todaysDate.date,
        "primary_release_date.gte": "1900-01-01",
        "first_air_date.lte": todaysDate.date,
        "first_air_date.gte": "1900-01-01",
        "with_runtime.gte": 0,
        "vote_average.lte": 10,
        "vote_average.gte": 0,
      };
      delete currentOptions["with_runtime.lte"];
      setOptions(currentOptions);

      setOptionsClicked(true);
      setResetClicked(true);
      setTimeout(() => {
        setResetClicked(false);
      }, 200);
    }
  }

  return (
    <section className={styles.Type} ref={type}>
      <div className={styles.flex_row + " " + styles.container}>
        <Popup
          menuName={"Show type"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={ShowType}
          childProps={{ handleClick, media_type }}
          selectedFilters={selectedFilters}
        />
        <Popup
          menuName={"Price"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={PriceMenu}
          childProps={{ options, setOptions, setOptionsClicked }}
          childRef={Price}
          selectedFilters={selectedFilters}
        />
        <Popup
          menuName={"Release year"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={ReleaseYearSlider}
          childProps={{
            options,
            setOptions,
            setOptionsClicked,
            isMobile,
            resetClicked,
          }}
          childRef={ReleaseYear}
          selectedFilters={selectedFilters}
        />
        <Popup
          menuName={"Rating"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={RatingSlider}
          childProps={{
            options,
            setOptions,
            setOptionsClicked,
            isMobile,
            resetClicked,
          }}
          childRef={Rating}
          selectedFilters={selectedFilters}
        />
        <Popup
          menuName={"Runtime"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={RunningTimeSlider}
          childProps={{
            options,
            setOptions,
            setOptionsClicked,
            isMobile,
            resetClicked,
          }}
          childRef={Runtime}
          selectedFilters={selectedFilters}
        />
        <div className={styles.reset} onClick={resetFilters}>
          <img src="/svg/reset_icon.svg" />
        </div>
      </div>
    </section>
  );
}
