import styles from "@/styles/Slider.module.css";
import { useState } from "react";
import React from "react";

export default function Slider() {
  const [sliderRefs, setSliderRefs] = useState({});
  sliderRefs.max = React.createRef();
  sliderRefs.min = React.createRef();
  sliderRefs.slider = React.createRef();
  sliderRefs.minText = React.createRef();
  sliderRefs.maxText = React.createRef();
  let startingMouseX;
  let mouseX;
  let side;

  function handleMouseDown(e) {
    side = e.target.id;
    mouseX = e.clientX;
    startingMouseX = e.clientX;
    console.dir(sliderRefs.slider.current);
    console.dir(sliderRefs.min.current);
    console.dir(sliderRefs.max.current);

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
    } else if (e.clientX >= sliderLeft + maxLeft + circleRadius){
      sliderRefs.min.current.style.left = `${maxLeft}px`;
    } else {
      sliderRefs.min.current.style.left = `${e.clientX - sliderLeft - circleRadius}px`;
    }

    const newPosition = parseInt(sliderRefs.min.current.style.left);
    const years = 1900 + Math.round(newPosition * pixelToYearRatio);

    sliderRefs.minText.current.innerText = years;
    console.log("Year: " + years);
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
    } else if(e.clientX <= sliderLeft + minLeft + circleRadius){
      sliderRefs.max.current.style.left = `${minLeft}px`
    } else {
      sliderRefs.max.current.style.left = `${e.clientX - sliderLeft - circleRadius}px`
    }

    const newPosition = parseInt(sliderRefs.max.current.style.left);
    const years = 1900 + Math.round(newPosition * pixelToYearRatio);

    sliderRefs.maxText.current.innerText = years;
    console.log("Year: " + years);
  }

  function handleMouseUp(e) {
    if (side === "min") {
      document.removeEventListener("mousemove", handleMouseMoveMin);
    } else {
      document.removeEventListener("mousemove", handleMouseMoveMax);
    }

    document.removeEventListener("mouseup", handleMouseUp);
  }

  return (
    <div className={styles.backdropSlider}>
      <div className={styles.slider} ref={sliderRefs.slider}>
        <p className={styles.minText} ref={sliderRefs.minText}>
          1900
        </p>
        <div
          onMouseDown={handleMouseDown}
          id="min"
          ref={sliderRefs.min}
          className={styles.circle}
          style={{ left: "0px" }}></div>
        <div
          onMouseDown={handleMouseDown}
          id="max"
          ref={sliderRefs.max}
          className={styles.circle}
          style={{ right: "0px" }}></div>
        <p className={styles.maxText} ref={sliderRefs.maxText}>
          2023
        </p>
      </div>
    </div>
  );
}
