import { useState, useEffect } from "react";
import Slider from "@/subcomponents/Slider";

export default function RatingSlider({
  options,
  setOptions,
  setOptionsClicked,
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);

  useEffect(() => {
    if (!firstLoad) {
      setOptions({ ...options, "vote_average.gte": minValue });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [minValue]);

  useEffect(() => {
    if (!firstLoad) {
      setOptions({ ...options, "vote_average.lte": maxValue });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [maxValue]);

  return (
    <div>
      <Slider
        min={0}
        max={10}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        type={"double"}
      />
    </div>
  );
}
