import styles from "@/styles/Slider.module.css";
import { useState, useEffect } from "react";
import { date } from "utils/utils";
import React from "react";

export default function Slider({ options, setOptions, setOptionsClicked }) {
  const [sliderRefs, setSliderRefs] = useState({});
  sliderRefs.max = React.createRef();
  sliderRefs.min = React.createRef();
  sliderRefs.slider = React.createRef();
  sliderRefs.minText = React.createRef();
  sliderRefs.maxText = React.createRef();
  let side;
  let minYear;
  let maxYear;

  function handleMouseDown(e) {
    side = e.target.id;

    if (side === "min") {
      sliderRefs.min.current.style.zIndex = "3";
      sliderRefs.max.current.style.zIndex = "2";
      document.addEventListener("mousemove", handleMouseMoveMin);
    } else {
      sliderRefs.min.current.style.zIndex = "2";
      sliderRefs.max.current.style.zIndex = "3";
      document.addEventListener("mousemove", handleMouseMoveMax);
    }

    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMoveMin(e) {
    const sliderWidth = sliderRefs.slider.current.offsetWidth;
    const sliderLeft = sliderRefs.slider.current.offsetLeft;
    const thumbWidth = sliderRefs.min.current.offsetWidth;
    const maxLeft = sliderRefs.max.current.offsetLeft;

    const totalYears = 123;
    const pixelToYearRatio = totalYears / (sliderWidth - thumbWidth);

    let circleRadius = thumbWidth / 2;

    //prettier-ignore
    if (e.clientX <= sliderLeft + circleRadius) {
      sliderRefs.min.current.style.left = "0px";
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 1px, rgba(0,0,0,1) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeft + circleRadius}px)`
    } else if (e.clientX >= sliderLeft + maxLeft + circleRadius){
      sliderRefs.min.current.style.left = `${maxLeft}px`;
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,1) ${maxLeft + circleRadius}px, rgba(0,0,0,1) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeft + circleRadius}px)`
    } else {
      sliderRefs.min.current.style.left = `${e.clientX - sliderLeft - circleRadius}px`;
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${e.clientX - sliderLeft - 1}px, rgba(0,0,0,1) ${e.clientX - sliderLeft}px, rgba(0,0,0,1) ${maxLeft + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeft + circleRadius}px)`
    }

    const newPosition = parseInt(sliderRefs.min.current.style.left);
    const years = 1900 + Math.round(newPosition * pixelToYearRatio);

    sliderRefs.minText.current.innerText = years;
    minYear = years;
  }

  function handleMouseMoveMax(e) {
    const sliderWidth = sliderRefs.slider.current.offsetWidth;
    const sliderLeft = sliderRefs.slider.current.offsetLeft;
    const minLeft = sliderRefs.min.current.offsetLeft;
    const thumbWidth = sliderRefs.min.current.offsetWidth;

    const totalYears = 123;
    const pixelToYearRatio = totalYears / (sliderWidth - thumbWidth);

    let circleRadius = sliderRefs.min.current.offsetWidth / 2;

    //prettier-ignore
    if(e.clientX >= sliderLeft + sliderWidth - circleRadius){
      sliderRefs.max.current.style.left = `${sliderWidth - (circleRadius * 2)}px`
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius}px, rgba(0,0,0,1) ${sliderWidth - 1}px, rgba(0,0,0,0) ${sliderWidth}px)`
    } else if(e.clientX <= sliderLeft + minLeft + circleRadius){
      sliderRefs.max.current.style.left = `${minLeft}px`
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius - 1}px, rgba(0,0,0,0) ${minLeft + circleRadius}px)`
    } else {
      sliderRefs.max.current.style.left = `${e.clientX - sliderLeft - circleRadius}px`
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${minLeft + circleRadius - 1}px, rgba(0,0,0,1) ${e.clientX - sliderLeft - 1}px, rgba(0,0,0,0) ${e.clientX - sliderLeft}px)`
    }

    const newPosition = parseInt(sliderRefs.max.current.style.left);
    const years = 1900 + Math.round(newPosition * pixelToYearRatio);

    sliderRefs.maxText.current.innerText = years;
    maxYear = years;
  }

  function handleMouseUp(e) {
    if (side === "min") {
      setOptions({
        ...options,
        "primary_release_date.gte": `${minYear}-01-01`,
      });
      document.removeEventListener("mousemove", handleMouseMoveMin);
    } else {
      if (maxYear === Number(date.year)) {
        setOptions({
          ...options,
          "primary_release_date.lte": `${date.date}`,
        });
      } else {
        setOptions({
          ...options,
          "primary_release_date.lte": `${maxYear}-12-31`,
        });
      }
      document.removeEventListener("mousemove", handleMouseMoveMax);
    }

    setOptionsClicked(true);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  return (
    <div className={styles.backdropSlider}>
      <div
        className={styles.slider}
        ref={sliderRefs.slider}
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 1px, rgba(0,0,0,1) 199px, rgba(0,0,0,0) 200px)",
        }}>
        <p className={styles.minText} ref={sliderRefs.minText}>
          1900
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
          2023
        </p>
      </div>
    </div>
  );
}
