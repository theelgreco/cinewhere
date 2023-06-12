import styles from "@/styles/Type.module.css";
import clsx from "clsx";
import ReleaseYearSlider from "./ReleaseYearSlider";
import RatingSlider from "./RatingSlider";
import RunningTimeSlider from "./RunningTimeSlider";
import PriceMenu from "./PriceMenu.jsx";
import Popup from "./Popup";
import { useRef, useState, useEffect } from "react";
import { movieGenres, tvGenres, genreIds } from "constants/genres";

export default function Type({
  media_type,
  set_media_type,
  options,
  setOptions,
  optionsClicked,
  setOptionsClicked,
  setSelectedGenres,
  setGenreList,
}) {
  const type = useRef();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuParent, setMenuParent] = useState(null);
  const [menuElements, setMenuElements] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuParent) {
      let temp = [];
      console.dir(menuParent);
      temp.push(
        menuParent,
        ...menuParent.children,
        ...allDescendants(menuParent.children[1], [])
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
      setMenuOpen(false);
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

  function allDescendants(node, arr) {
    for (let i = 0; i < node.children.length; i++) {
      let child = node.children[i];
      arr.push(child);
      allDescendants(child, arr);
    }
    return arr;
  }

  return (
    <section className={styles.Type} ref={type}>
      <div className={styles.flex_row + " " + styles.container}>
        <div className={styles.flex_row + " " + styles.media}>
          <div
            id="tv"
            onClick={handleClick}
            className={clsx(styles.buttonChoices, {
              [styles.selected]: media_type === "tv",
            })}>
            TV
          </div>
          <div
            id="movie"
            onClick={handleClick}
            className={clsx(styles.buttonChoices, {
              [styles.selected]: media_type === "movie",
            })}>
            MOVIES
          </div>
        </div>
        <Popup
          menuName={"price"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={PriceMenu}
          childProps={{ options, setOptions, setOptionsClicked }}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
        />
        <div className={styles.flex_col + " " + styles.range}>
          <Popup
            menuName={"Release Year"}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setMenuParent={setMenuParent}
            menuParent={menuParent}
            setMenuElements={setMenuElements}
            ChildComponent={ReleaseYearSlider}
            childProps={{ options, setOptions, setOptionsClicked }}
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen}
          />
          {/* <ReleaseYearSlider
            options={options}
            setOptions={setOptions}
            setOptionsClicked={setOptionsClicked}
          /> */}
        </div>
        <div className={styles.flex_col + " " + styles.range}>
          <RatingSlider
            options={options}
            setOptions={setOptions}
            setOptionsClicked={setOptionsClicked}
          />
        </div>
        <div className={styles.flex_col + " " + styles.range}>
          <RunningTimeSlider
            options={options}
            setOptions={setOptions}
            setOptionsClicked={setOptionsClicked}
          />
        </div>
      </div>
    </section>
  );
}
