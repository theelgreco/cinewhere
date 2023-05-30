import styles from "@/styles/Type.module.css";
import clsx from "clsx";
import Slider from "./subcomponents/Slider";

export default function Type({
  media_type,
  set_media_type,
  options,
  setOptions,
  optionsClicked,
  setOptionsClicked,
}) {
  function handleClick(e) {
    set_media_type(e.target.id);
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
    <section className={styles.Type}>
      <div className={styles.flex_row}>
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
        {/* <p>Release Year</p>
        <div className={styles.flex_row + " " + styles.year}>
          <select></select>
          <select></select>
        </div> */}
        <Slider />
      </div>
    </section>
  );
}
