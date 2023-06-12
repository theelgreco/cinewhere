import Slider from "@/subcomponents/Slider";
import { useState, useEffect } from "react";

export default function RunningTimeSlider({
  options,
  setOptions,
  setOptionsClicked,
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState("any");

  useEffect(() => {
    if (!firstLoad) {
      let currentOptions = { ...options };
      console.log(maxValue, currentOptions);
      maxValue === "any" && currentOptions["with_runtime.lte"]
        ? (delete currentOptions["with_runtime.lte"],
          setOptions({ ...currentOptions }))
        : setOptions({ ...currentOptions, "with_runtime.lte": maxValue });
      setOptionsClicked(true);
    } else {
      setFirstLoad(false);
    }
  }, [maxValue]);

  return (
    <div>
      <Slider
        min={1}
        max={180}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        type={"single.lte"}
      />
    </div>
  );
}
