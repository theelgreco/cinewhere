import styles from "@/styles/Type.module.css";
import ReleaseYearSlider from "@/subcomponents/ReleaseYearSlider";
import RatingSlider from "@/subcomponents/RatingSlider";
import RunningTimeSlider from "@/subcomponents/RunningTimeSlider";
import PriceMenu from "@/subcomponents/PriceMenu.jsx";
import ShowType from "@/subcomponents/ShowType";
import Popup from "@/subcomponents/Popup";
import { useRef, useState, useEffect } from "react";
import { movieGenres, tvGenres } from "constants/genres";
import React from "react";

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

  useEffect(() => {
    if (menuParent) {
      let temp = [];
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
        <Popup
          menuName={"Show type"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={ShowType}
          childProps={{ handleClick, media_type }}
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
        />
        <Popup
          menuName={"Release year"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={ReleaseYearSlider}
          childProps={{ options, setOptions, setOptionsClicked, isMobile }}
          childRef={ReleaseYear}
        />
        <Popup
          menuName={"Rating"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={RatingSlider}
          childProps={{ options, setOptions, setOptionsClicked, isMobile }}
          childRef={Rating}
        />
        <Popup
          menuName={"Runtime"}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setMenuParent={setMenuParent}
          menuParent={menuParent}
          setMenuElements={setMenuElements}
          ChildComponent={RunningTimeSlider}
          childProps={{ options, setOptions, setOptionsClicked, isMobile }}
          childRef={Runtime}
        />
      </div>
    </section>
  );
}
