import clsx from "clsx";
import styles from "@/styles/PriceMenu.module.css";

export default function PriceMenu({ options, setOptions, setOptionsClicked, priceRef }) {
  const prices = [
    { free: "free" },
    { ads: "ads" },
    { flatrate: "subscription" },
    { rent: "rent" },
    { buy: "buy" },
  ];

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
    <>
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
    </>
  );
}
