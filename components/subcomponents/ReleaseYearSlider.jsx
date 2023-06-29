import Slider from "@/subcomponents/Slider";
import { todaysDate } from "utils/utils";
import { useState, useEffect } from "react";

export default function ReleaseYearSlider({
  isMobile,
  options,
  setOptions,
  setOptionsClicked,
  menuOpen,
  resetClicked,
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [minValue, setMinValue] = useState(1900);
  const [maxValue, setMaxValue] = useState(2023);

  useEffect(() => {
    if (!firstLoad && !resetClicked) {
      let value;
      maxValue === Number(todaysDate.year)
        ? (value = `${todaysDate.date}`)
        : (value = `${maxValue}-12-31`);

      setOptions({
        ...options,
        "primary_release_date.gte": `${minValue}-01-01`,
        "first_air_date.gte": `${minValue}-01-01`,
        "primary_release_date.lte": value,
        "first_air_date.lte": value,
      });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [minValue, maxValue]);

  return (
    <div>
      <Slider
        isMobile={isMobile}
        min={1900}
        max={2023}
        step={1}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        type={"double"}
        resetClicked={resetClicked}
      />
    </div>
  );
}
