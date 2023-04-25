import styles from "@/styles/ServiceCard.module.css";
import { clsx } from "clsx";
import { useState } from "react";

export default function ServiceCard({
  serviceName,
  background,
  isMobile,
  mouseMoving,
  options,
  setOptions,
  noneSelected,
  setNoneSelected,
}) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick(e) {
    const newOptions = { ...options };

    if (mouseMoving) {
      return;
    } else if (!isSelected) {
      setIsSelected(true);
      setNoneSelected(false);

      if (!newOptions.params.services) {
        newOptions.params.services = serviceName;
        newOptions.url =
          "https://streaming-availability.p.rapidapi.com/v2/search/basic";
      } else {
        newOptions.params.services += `,${serviceName}`;
      }

      setOptions(newOptions);
    } else {
      setIsSelected(false);
      let splitServices = newOptions.params.services.split(",");
      splitServices.pop();
      let joinServices = splitServices.join(",");
      newOptions.params.services = joinServices;

      if (!newOptions.params.services) {
        setNoneSelected(true);
        delete newOptions.params.services;
        delete newOptions.url;
      }

      setOptions(newOptions);
    }
  }

  return (
    <div
      type="unselected"
      className={clsx({
        [styles.noneSelected]: noneSelected,
        [styles.unselected]: !isSelected && !isMobile && !noneSelected,
        [styles.selected]: isSelected && !isMobile && !noneSelected,
        [styles.mobile]: !isSelected && isMobile,
        [styles.mobileSelected]: isSelected && isMobile,
      })}
      style={{ background: `no-repeat center/cover url(${background})` }}
      onClick={handleClick}></div>
  );
}
