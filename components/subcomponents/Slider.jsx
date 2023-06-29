import styles from "@/styles/Slider.module.css";
import { useState, useEffect } from "react";
import React from "react";

export default function Slider({
  isMobile,
  min,
  max,
  step,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  type,
  resetClicked,
}) {
  const [sliderRefs, setSliderRefs] = useState({});
  let side;
  let updatedMin = minValue;
  let updatedMax = maxValue;

  useEffect(() => {
    const refs = {
      max: React.createRef(),
      min: React.createRef(),
      slider: React.createRef(),
      minText: React.createRef(),
      maxText: React.createRef(),
    };

    setSliderRefs(refs);
  }, []);

  useEffect(() => {
    if (sliderRefs.min?.current && isMobile) {
      sliderRefs.min.current.addEventListener("touchstart", handleMouseDown, {
        passive: false,
      });
    }

    if (sliderRefs.max?.current && isMobile) {
      sliderRefs.max.current.addEventListener("touchstart", handleMouseDown, {
        passive: false,
      });
    }

    if (sliderRefs.min?.current && !isMobile) {
      sliderRefs.min.current.addEventListener("mousedown", handleMouseDown, {
        passive: false,
      });
    }

    if (sliderRefs.max?.current && !isMobile) {
      sliderRefs.max.current.addEventListener("mousedown", handleMouseDown, {
        passive: false,
      });
    }
  }, [sliderRefs]);

  useEffect(() => {
    if (resetClicked) reset();
  }, [resetClicked]);

  function handleMouseDown(e) {
    e.preventDefault();
    side = e.target.id;

    if (side === "min" && type === "double") {
      sliderRefs.min.current.style.zIndex = "3";
      sliderRefs.max.current.style.zIndex = "2";
      !e.touches
        ? document.addEventListener("mousemove", handleMouseMoveMin)
        : document.addEventListener("touchmove", handleMouseMoveMin, {
            passive: false,
          });
    } else if (side === "max" && type === "double") {
      sliderRefs.min.current.style.zIndex = "2";
      sliderRefs.max.current.style.zIndex = "3";
      !e.touches
        ? document.addEventListener("mousemove", handleMouseMoveMax)
        : document.addEventListener("touchmove", handleMouseMoveMax, {
            passive: false,
          });
    } else if (type === "single.gte") {
      !e.touches
        ? document.addEventListener("mousemove", handleMouseMoveMin)
        : document.addEventListener("touchmove", handleMouseMoveMin, {
            passive: false,
          });
    } else if (type === "single.lte") {
      !e.touches
        ? document.addEventListener("mousemove", handleMouseMoveMax)
        : document.addEventListener("touchmove", handleMouseMoveMax, {
            passive: false,
          });
    }

    !e.touches
      ? document.addEventListener("mouseup", handleMouseUp)
      : document.addEventListener("touchend", handleMouseUp);
  }

  function handleMouseMoveMin(e) {
    e.preventDefault();
    const sliderWidth = sliderRefs.slider.current.offsetWidth;
    const sliderLeft = sliderRefs.slider.current.getBoundingClientRect().x;
    const thumbWidth = sliderRefs.min.current.offsetWidth;
    let mouseX;
    !e.touches ? (mouseX = e.clientX) : (mouseX = e.touches[0].clientX);
    let increment = 1 / step;
    const totalValue = max * increment - min;
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

    //prettier-ignore
    if (mouseX <= sliderLeft + circleRadius) {
      // if slider is moved to the leftmost position
      sliderRefs.min.current.style.left = "0px";
      sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 1px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeftLocal + circleRadius}px)`
    } else if (mouseX >= maxLeft + circleRadius){
      // if slider is moved either to the end or to where the max circle currently is
      sliderRefs.min.current.style.left = `${sliderRefs.max.current.offsetLeft}px`;
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeftLocal + circleRadius}px)` 
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius}px, rgba(0,0,0,1) ${maxLeftLocal + (circleRadius * 2)}px, rgba(0,0,0,0) ${maxLeftLocal + (circleRadius * 2) + 1}px)`
    } else {
      // else set it to the current mouse position
      sliderRefs.min.current.style.left = `${mouseX - sliderLeft - circleRadius}px`;
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft}px, rgba(0,0,0,1) ${maxLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${maxLeftLocal + circleRadius}px)` 
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft}px, rgba(0,0,0,1) ${maxLeftLocal + (circleRadius * 2)}px, rgba(0,0,0,0) ${maxLeftLocal + (circleRadius * 2) + 1}px)`
    }

    const newPosition = parseInt(sliderRefs.min.current.style.left);
    const years =
      (min + Math.floor(newPosition * pixelToValueRatio)) / increment;

    sliderRefs.minText.current.innerText = years;
    updatedMin = years;
  }

  function handleMouseMoveMax(e) {
    e.preventDefault();
    const sliderWidth = sliderRefs.slider.current.offsetWidth;
    const sliderLeft = sliderRefs.slider.current.getBoundingClientRect().x;
    const thumbWidth = sliderRefs.max.current.offsetWidth;
    let mouseX;
    !e.touches ? (mouseX = e.clientX) : (mouseX = e.touches[0].clientX);
    let increment = 1 / step;
    const totalValue = max * increment - min;
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
      // if slider is moved to rightmost position
      sliderRefs.max.current.style.left = `${sliderWidth - (circleRadius * 2)}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius}px, rgba(0,0,0,1) ${sliderWidth - 1}px, rgba(0,0,0,0) ${sliderWidth}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal - 1}px, rgba(0,0,0,1) ${minLeftLocal}px, rgba(0,0,0,1) ${sliderWidth - 1}px, rgba(0,0,0,0) ${sliderWidth}px)`
    } else if(mouseX <= minLeft + circleRadius){
      // if slider is moved to left most position or to where the min circle currently is
      sliderRefs.max.current.style.left = `${minLeftLocal}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${minLeftLocal + circleRadius}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal - 1}px, rgba(0,0,0,1) ${minLeftLocal}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,0) ${minLeftLocal + circleRadius}px)`
    } else {
      // else set position to mouse position
      sliderRefs.max.current.style.left = `${mouseX - sliderLeft - circleRadius}px`
      type === 'double' 
      ? sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${minLeftLocal + circleRadius - 1}px, rgba(0,0,0,1) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,0) ${mouseX - sliderLeft}px)`
      : sliderRefs.slider.current.style.background = `linear-gradient(90deg, rgba(0,0,0,0) ${minLeftLocal - 1}px, rgba(0,0,0,1) ${minLeftLocal}px, rgba(0,0,0,1) ${mouseX - sliderLeft - 1}px, rgba(0,0,0,0) ${mouseX - sliderLeft}px)`
    }

    const newPosition = parseInt(sliderRefs.max.current.style.left);
    const years =
      (min + Math.floor(newPosition * pixelToValueRatio)) / increment;

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
      !e.touches
        ? document.removeEventListener("mousemove", handleMouseMoveMin)
        : document.removeEventListener("touchmove", handleMouseMoveMin, {
            passive: false,
          });
    } else {
      setMaxValue(updatedMax);
      !e.touches
        ? document.removeEventListener("mousemove", handleMouseMoveMax)
        : document.removeEventListener("touchmove", handleMouseMoveMax, {
            passive: false,
          });
    }
    !e.touches
      ? document.removeEventListener("mouseup", handleMouseUp)
      : document.removeEventListener("touchend", handleMouseUp);
  }

  function renderSliderType(type) {
    if (type === "double") {
      return (
        <>
          <p className={styles.minText} ref={sliderRefs.minText}>
            {minValue}
          </p>
          <div
            id="min"
            ref={sliderRefs.min}
            className={styles.circle}
            style={{ left: "0px" }}>
            {"<"}
          </div>
          <div
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

  function reset() {
    if (sliderRefs.min?.current) {
      sliderRefs.min.current.style.left = "0px";
      setMinValue(min);
    }

    if (sliderRefs.max?.current) {
      sliderRefs.max.current.style.right = "0px";
      sliderRefs.max.current.style.left = "unset";
      type === "single.lte"
        ? (setMaxValue("any"), (sliderRefs.maxText.current.innerText = "any"))
        : setMaxValue(max);
    }

    sliderRefs.slider.current.style.background =
      "linear-gradient(90deg, rgba(0,0,0,0) -1px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 200px, rgba(0,0,0,0) 201px)";
  }

  return (
    <>
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
        <div className={styles.resetContainer}>
          <img onClick={reset} src="svg/reset_icon.svg" />
          <div>reset</div>
        </div>
      </div>
    </>
  );
}
