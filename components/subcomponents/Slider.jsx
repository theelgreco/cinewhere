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
    const sliderLeft = sliderRefs.slider.current.getBoundingClientRect().x;
    const thumbWidth = sliderRefs.min.current.offsetWidth;
    const mouseX = e.clientX;
    const totalValue = max - min;
    const pixelToValueRatio = totalValue / (sliderWidth - thumbWidth);

    let maxLeft;
    let maxLeftLocal;
    let circleRadius = thumbWidth / 2;

    if (type === "double") {
      // maxLeft = sliderRefs.max.current.offsetLeft;
      maxLeft = sliderRefs.max.current.getBoundingClientRect().x;
      maxLeftLocal = maxLeft - sliderLeft;
    } else if (type === "single.gte") {
      maxLeft = sliderLeft + sliderWidth - circleRadius * 2;
      maxLeftLocal = maxLeft - sliderLeft;
    }

    console.log(maxLeftLocal, "px", " <-- local");
    console.log(maxLeft, "px", " <-- global");

    //prettier-ignore
    if (mouseX <= sliderLeft + circleRadius) {
      console.log('here')
      sliderRefs.min.current.style.left = "0px";
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 1px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeftLocal + circleRadius}px)`
    } else if (mouseX >= maxLeft + circleRadius){
      sliderRefs.min.current.style.left = `${sliderRefs.max.current.offsetLeft}px`;
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeftLocal + circleRadius}px)` 
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius}px, rgba(0,0,0,1) ${maxLeftLocal + (circleRadius * 2)}px, rgba(0,0,0,0) ${maxLeftLocal + (circleRadius * 2) + 1}px)`
    } else {
      sliderRefs.min.current.style.left = `${mouseX - sliderLeft - circleRadius}px`;
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeftLocal + circleRadius}px)` 
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft}px, rgba(0,0,0,1) ${maxLeftLocal + (circleRadius * 2)}px, rgba(0,0,0,0) ${maxLeftLocal + (circleRadius * 2) + 1}px)`
    }

    const newPosition = parseInt(sliderRefs.min.current.style.left);
    const years = min + Math.round(newPosition * pixelToValueRatio);

    sliderRefs.minText.current.innerText = years;
    updatedMin = years;
  }

  function handleMouseMoveMax(e) {
    const sliderWidth = sliderRefs.slider.current.offsetWidth;
    const sliderLeft = sliderRefs.slider.current.getBoundingClientRect().x;
    const thumbWidth = sliderRefs.max.current.offsetWidth;
    const mouseX = e.clientX;
    const totalValue = max - min;
    const pixelToValueRatio = totalValue / (sliderWidth - thumbWidth);

    let minLeft;
    let minLeftLocal;
    let circleRadius = sliderRefs.max.current.offsetWidth / 2;

    if (type === "double") {
      minLeft = sliderRefs.min.current.getBoundingClientRect().x;
      minLeftLocal = minLeft - sliderLeft;
    } else if (type === "single.lte") {
      minLeft = sliderLeft;
      minLeftLocal = 0;
    }

    //prettier-ignore
    if(mouseX >= sliderLeft + sliderWidth - circleRadius){
      sliderRefs.max.current.style.left = `${sliderWidth - (circleRadius * 2)}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius}px, rgba(0,0,0,1) ${sliderWidth - 1}px, rgba(0,0,0,0) ${sliderWidth}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal - 1}px, rgba(0,0,0,1) ${minLeftLocal}px, rgba(0,0,0,1) ${sliderWidth - 1}px, rgba(0,0,0,0) ${sliderWidth}px)`
    } else if(mouseX <= minLeft + circleRadius){
      sliderRefs.max.current.style.left = `${minLeftLocal}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${minLeftLocal + circleRadius}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal - 1}px, rgba(0,0,0,1) ${minLeftLocal}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${minLeftLocal + circleRadius}px)`
    } else {
      sliderRefs.max.current.style.left = `${mouseX - sliderLeft - circleRadius}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,0) ${mouseX - sliderLeft}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal - 1}px, rgba(0,0,0,1) ${minLeftLocal}px, rgba(0,0,0,1) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,0) ${mouseX - sliderLeft}px)`
    }

    const newPosition = parseInt(sliderRefs.max.current.style.left);
    const years = min + Math.round(newPosition * pixelToValueRatio);

    if (type === "single.lte" && years >= max) {
      updatedMax = "any";
      sliderRefs.maxText.current.innerText = "any";
    } else {
      updatedMax = years;
      sliderRefs.maxText.current.innerText = years;
    }
  }

  function handleMouseUp(e) {
    if (side === "min") {
      setMinValue(updatedMin);
      document.removeEventListener("mousemove", handleMouseMoveMin);
    } else {
      setMaxValue(updatedMax);
      document.removeEventListener("mousemove", handleMouseMoveMax);
    }
    document.removeEventListener("mouseup", handleMouseUp);
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
