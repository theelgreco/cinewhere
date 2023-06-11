import styles from "@/styles/Type.module.css";
import clsx from "clsx";
import ReleaseYearSlider from "./ReleaseYearSlider";
import RatingSlider from "./RatingSlider";
import RunningTimeSlider from "./RunningTimeSlider";
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
  const prices = [
    { free: "free" },
    { ads: "ads" },
    { flatrate: "subscription" },
    { rent: "rent" },
    { buy: "buy" },
  ];

  useEffect(() => {
    if (menuParent) {
      let temp = [];
      temp.push(
        menuParent,
        ...menuParent.children,
        ...menuParent.children[1].children
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

  function handlePriceClick(e) {
    e.stopPropagation();
    const currentWatchMonetizationTypes =
      options.with_watch_monetization_types.split("|");

    if (!options.with_watch_monetization_types) {
      setOptions({ ...options, with_watch_monetization_types: e.target.id });
    } else if (currentWatchMonetizationTypes.includes(e.target.id)) {
      const indexToRemove = currentWatchMonetizationTypes.indexOf(e.target.id);
      currentWatchMonetizationTypes.splice(indexToRemove, 1);
      const updatedWatchMonetizationTypes =
        currentWatchMonetizationTypes.join("|");
      setOptions({
        ...options,
        with_watch_monetization_types: updatedWatchMonetizationTypes,
      });
    } else {
      currentWatchMonetizationTypes.push(e.target.id);
      const updatedWatchMonetizationTypes =
        currentWatchMonetizationTypes.join("|");
      setOptions({
        ...options,
        with_watch_monetization_types: updatedWatchMonetizationTypes,
      });
    }

    setOptionsClicked(true);
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
        <div
          className={styles.priceBtn}
          onClick={(e) => {
            if (!menuParent) {
              setSelectedMenu("price");
              setMenuParent(e.target);
              setMenuElements([]);
            } else {
              setMenuParent(null);
              setSelectedMenu("");
              setMenuElements([]);
            }
          }}>
          <p
            onClick={(e) => {
              e.stopPropagation();
              if (!menuParent) {
                setSelectedMenu("price");
                setMenuParent(e.target.parentElement);
              } else {
                setMenuParent(null);
                setSelectedMenu("");
              }
            }}>
            Price
          </p>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={clsx(styles.flex_col + " " + styles.price, {
              [styles.hidden]: selectedMenu !== "price",
            })}>
            {prices.map((price) => {
              let key = Object.keys(price)[0];
              return (
                <div
                  id={key}
                  key={key}
                  onClick={handlePriceClick}
                  className={clsx(styles.buttonChoices, {
                    [styles.selected]: options.with_watch_monetization_types
                      .split("|")
                      .includes(key),
                  })}>
                  {price[key]}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.flex_col + " " + styles.range}>
          <ReleaseYearSlider
            options={options}
            setOptions={setOptions}
            setOptionsClicked={setOptionsClicked}
          />
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
