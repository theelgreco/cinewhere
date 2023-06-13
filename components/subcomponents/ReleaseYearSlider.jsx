import Slider from "@/subcomponents/Slider";
import { todaysDate } from "utils/utils";
import { useState, useEffect } from "react";

export default function ReleaseYearSlider({
  isMobile,
  options,
  setOptions,
  setOptionsClicked,
  menuOpen,
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [minValue, setMinValue] = useState(1900);
  const [maxValue, setMaxValue] = useState(2023);

  useEffect(() => {
    if (!firstLoad) {
      setOptions({
        ...options,
        "primary_release_date.gte": `${minValue}-01-01`,
        "first_air_date.gte": `${minValue}-01-01`,
      });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [minValue]);

  useEffect(() => {
    if (!firstLoad) {
      let value;
      maxValue === todaysDate.year
        ? (value = `${todaysDate.date}`)
        : (value = `${maxValue}-12-31`);
      setOptions({
        ...options,
        "primary_release_date.lte": value,
        "first_air_date.lte": value,
      });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [maxValue]);

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
      />
    </div>
  );
}
