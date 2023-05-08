import styles from "@/styles/ServiceCard.module.css";
import { clsx } from "clsx";
import { useState, useEffect } from "react";

export default function ServiceCard({
  serviceName,
  background,
  isMobile,
  mouseMoving,
  noneSelected,
  setNoneSelected,
  selectedServices,
  setSelectedServices,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (!selectedServices.length) setNoneSelected(true);

    if (selectedServices.includes(serviceName)) {
      setIsSelected(true);
      noneSelected ?? setNoneSelected(false);
    }
  }, [selectedServices]);

  function handleClick(e) {
    if (mouseMoving) {
      return;
    }

    if (!isSelected) {
      setSelectedServices([...selectedServices, serviceName]);
      setIsSelected(true);
      setNoneSelected(false);
    } else {
      const servicesCopy = [...selectedServices];
      servicesCopy.splice(servicesCopy.indexOf(serviceName), 1);
      setSelectedServices(servicesCopy);
      setIsSelected(false);
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
