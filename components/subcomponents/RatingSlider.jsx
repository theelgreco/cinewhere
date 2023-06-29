import { useState, useEffect } from "react";
import Slider from "@/subcomponents/Slider";

export default function RatingSlider({
  isMobile,
  options,
  setOptions,
  setOptionsClicked,
  resetClicked,
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);

  useEffect(() => {
    if (!firstLoad && !resetClicked) {
      setOptions({ ...options, "vote_average.gte": minValue });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [minValue]);

  useEffect(() => {
    if (!firstLoad && !resetClicked) {
      setOptions({ ...options, "vote_average.lte": maxValue });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [maxValue]);

  return (
    <div>
      <Slider
        isMobile={isMobile}
        min={0}
        max={10}
        step={0.1}
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
