import styles from "@/styles/Type.module.css";
import clsx from "clsx";
import Slider from "./subcomponents/Slider";
import ReleaseYearSlider from "./ReleaseYearSlider";
import { useRef } from "react";
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

  function handleClick(e) {
    let mediaObj = { movie: movieGenres, tv: tvGenres };

    set_media_type(e.target.id);

    setSelectedGenres([]);
    setGenreList(mediaObj[e.target.id]);

    setOptionsClicked(true);
  }

  function handlePriceClick(e) {
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
        <div className={styles.flex_row + " " + styles.price}>
          <div
            id="free"
            onClick={handlePriceClick}
            className={clsx(styles.buttonChoices, {
              [styles.selected]: options.with_watch_monetization_types
                .split("|")
                .includes("free"),
            })}>
            FREE
          </div>
          <div
            id="ads"
            onClick={handlePriceClick}
            className={clsx(styles.buttonChoices, {
              [styles.selected]: options.with_watch_monetization_types
                .split("|")
                .includes("ads"),
            })}>
            ADS
          </div>
          <div
            id="flatrate"
            onClick={handlePriceClick}
            className={clsx(styles.buttonChoices, {
              [styles.selected]: options.with_watch_monetization_types
                .split("|")
                .includes("flatrate"),
            })}>
            FLATRATE
          </div>
          <div
            id="rent"
            onClick={handlePriceClick}
            className={clsx(styles.buttonChoices, {
              [styles.selected]: options.with_watch_monetization_types
                .split("|")
                .includes("rent"),
            })}>
            RENT
          </div>
          <div
            id="buy"
            onClick={handlePriceClick}
            className={clsx(styles.buttonChoices, {
              [styles.selected]: options.with_watch_monetization_types
                .split("|")
                .includes("buy"),
            })}>
            BUY
          </div>
        </div>
        <div className={styles.flex_col + " " + styles.range}>
          <ReleaseYearSlider
            options={options}
            setOptions={setOptions}
            setOptionsClicked={setOptionsClicked}
          />
        </div>
      </div>
    </section>
  );
}
