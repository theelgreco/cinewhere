import styles from "@/styles/Slider.module.css";
import { useState } from "react";
import React from "react";

export default function Slider({
  min,
  max,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  parent,
  type,
}) {
  const [sliderRefs, setSliderRefs] = useState({});
  sliderRefs.max = React.createRef();
  sliderRefs.min = React.createRef();
  sliderRefs.slider = React.createRef();
  sliderRefs.minText = React.createRef();
  sliderRefs.maxText = React.createRef();
  let side;
  let updatedMin = minValue;
  let updatedMax = maxValue;

  function handleMouseDown(e) {
    side = e.target.id;

    if (side === "min" && type === "double") {
      sliderRefs.min.current.style.zIndex = "3";
      sliderRefs.max.current.style.zIndex = "2";
      document.addEventListener("mousemove", handleMouseMoveMin);
    } else if (side === "max" && type === "double") {
      sliderRefs.min.current.style.zIndex = "2";
      sliderRefs.max.current.style.zIndex = "3";
      document.addEventListener("mousemove", handleMouseMoveMax);
    } else if (type === "single.gte") {
      document.addEventListener("mousemove", handleMouseMoveMin);
    } else if (type === "single.lte") {
      document.addEventListener("mousemove", handleMouseMoveMax);
    }

    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMoveMin(e) {
    const sliderWidth = sliderRefs.slider.current.offsetWidth;
    const sliderLeft = sliderRefs.slider.current.offsetLeft;
    const thumbWidth = sliderRefs.min.current.offsetWidth;
    const mouseX = e.clientX + parent.current.scrollLeft;
    const totalValue = max - min;
    const pixelToValueRatio = totalValue / (sliderWidth - thumbWidth);

    let maxLeft;
    let circleRadius = thumbWidth / 2;

    if (type === "double") {
      maxLeft = sliderRefs.max.current.offsetLeft;
    } else if (type === "single.gte") {
      maxLeft = sliderWidth - circleRadius * 2;
    }

    //prettier-ignore
    if (mouseX <= sliderLeft + circleRadius) {
      sliderRefs.min.current.style.left = "0px";
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 1px, rgba(0,0,0,1) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeft + circleRadius}px)`
    } else if (mouseX >= sliderLeft + maxLeft + circleRadius){
      sliderRefs.min.current.style.left = `${maxLeft}px`;
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,1) ${maxLeft + circleRadius}px, rgba(0,0,0,1) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeft + circleRadius}px)` 
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,1) ${maxLeft + circleRadius}px, rgba(0,0,0,1) ${maxLeft + (circleRadius * 2)}px, rgba(0,0,0,0) ${maxLeft + (circleRadius * 2) + 1}px)`
    } else {
      sliderRefs.min.current.style.left = `${mouseX - sliderLeft - circleRadius}px`;
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft}px, rgba(0,0,0,1) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeft + circleRadius}px)` 
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft}px, rgba(0,0,0,1) ${maxLeft + (circleRadius * 2)}px, rgba(0,0,0,0) ${maxLeft + (circleRadius * 2) + 1}px)`
    }

    const newPosition = parseInt(sliderRefs.min.current.style.left);
    const years = min + Math.round(newPosition * pixelToValueRatio);

    sliderRefs.minText.current.innerText = years;
    updatedMin = years;
  }

  function handleMouseMoveMax(e) {
    const sliderWidth = sliderRefs.slider.current.offsetWidth;
    const sliderLeft = sliderRefs.slider.current.offsetLeft;
    const thumbWidth = sliderRefs.max.current.offsetWidth;
    const mouseX = e.clientX + parent.current.scrollLeft;
    const totalValue = max - min;
    const pixelToValueRatio = totalValue / (sliderWidth - thumbWidth);

    let minLeft;
    let circleRadius = sliderRefs.max.current.offsetWidth / 2;

    if (type === "double") {
      minLeft = sliderRefs.min.current.offsetLeft;
    } else if (type === "single.lte") {
      minLeft = 0;
    }

    //prettier-ignore
    if(mouseX >= sliderLeft + sliderWidth - circleRadius){
      sliderRefs.max.current.style.left = `${sliderWidth - (circleRadius * 2)}px`
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius}px, rgba(0,0,0,1) ${sliderWidth - 1}px, rgba(0,0,0,0) ${sliderWidth}px)`
    } else if(mouseX <= sliderLeft + minLeft + circleRadius){
      sliderRefs.max.current.style.left = `${minLeft}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius - 1}px, rgba(0,0,0,0) ${minLeft + circleRadius}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft - 1}px, rgba(0,0,0,1) ${minLeft}px, rgba(0,0,0,1) ${minLeft + circleRadius - 1}px, rgba(0,0,0,0) ${minLeft + circleRadius}px)`
    } else {
      sliderRefs.max.current.style.left = `${mouseX - sliderLeft - circleRadius}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,0) ${mouseX - sliderLeft}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft - 1}px, rgba(0,0,0,1) ${minLeft}px, rgba(0,0,0,1) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,0) ${mouseX - sliderLeft}px)`
    }

    const newPosition = parseInt(sliderRefs.max.current.style.left);
    const years = min + Math.round(newPosition * pixelToValueRatio);

    sliderRefs.maxText.current.innerText = years;
    updatedMax = years;
  }

  function handleMouseUp(e) {
    if (side === "min") {
      //setminvalue
      setMinValue(updatedMin);
      document.removeEventListener("mousemove", handleMouseMoveMin);
    } else {
      //setmaxvalue
      setMaxValue(updatedMax);
      document.removeEventListener("mousemove", handleMouseMoveMax);

      // setOptionsClicked(true);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }

  function renderSliderType(type) {
    if (type === "double") {
      return (
        <>
          <p className={styles.minText} ref={sliderRefs.minText}>
            {minValue}
          </p>
          <div
            onMouseDown={handleMouseDown}
            id="min"
            ref={sliderRefs.min}
            className={styles.circle}
            style={{ left: "0px" }}>
            {"<"}
          </div>
          <div
            onMouseDown={handleMouseDown}
            id="max"
            ref={sliderRefs.max}
            className={styles.circle}
            style={{ right: "0px" }}>
            {">"}
          </div>
          <p className={styles.maxText} ref={sliderRefs.maxText}>
            {maxValue}
          </p>
        </>
      );
    } else if (type === "single.gte") {
      return (
        <>
          <p className={styles.minText} ref={sliderRefs.minText}>
            {minValue}
          </p>
          <div
            onMouseDown={handleMouseDown}
            id="min"
            ref={sliderRefs.min}
            className={styles.circle}
            style={{ left: "0px" }}>
            {"<"}
          </div>
        </>
      );
    } else if (type === "single.lte") {
      return (
        <>
          <div
            onMouseDown={handleMouseDown}
            id="max"
            ref={sliderRefs.max}
            className={styles.circle}
            style={{ right: "0px" }}>
            {">"}
          </div>
          <p className={styles.maxText} ref={sliderRefs.maxText}>
            {maxValue}
          </p>
        </>
      );
    }
  }

  return (
    <div className={styles.backdropSlider}>
      <div
        className={styles.slider}
        ref={sliderRefs.slider}
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) -1px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 200px, rgba(0,0,0,0) 201px)",
        }}>
        {renderSliderType(type)}
      </div>
    </div>
  );
}
