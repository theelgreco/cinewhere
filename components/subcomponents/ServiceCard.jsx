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
  servicesList,
  setServicesList,
  provider_id,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (!selectedServices.length) {
      setIsSelected(false);
      setNoneSelected(true);
    }

    if (selectedServices.includes(serviceName)) {
      setIsSelected(true);
      noneSelected ? setNoneSelected(false) : null;
    }
  }, [selectedServices]);

  function handleClick(e) {
    if (mouseMoving) {
      return;
    }

    const serviceListCopy = [...servicesList];
    const findServiceIndex = serviceListCopy.findIndex((el) => {
      return el.id === serviceName;
    });
    const serviceToReplace = serviceListCopy[findServiceIndex];
    serviceListCopy.splice(findServiceIndex, 1);

    if (!isSelected) {
      setSelectedServices([...selectedServices, provider_id]);
      setIsSelected(true);
      setNoneSelected(false);

      serviceListCopy.splice(selectedServices.length, 0, serviceToReplace);
      setServicesList(serviceListCopy);
    } else {
      const servicesCopy = [...selectedServices];
      servicesCopy.splice(servicesCopy.indexOf(provider_id), 1);
      setSelectedServices(servicesCopy);
      setIsSelected(false);

      serviceListCopy.splice(selectedServices.length - 1, 0, serviceToReplace);
      setServicesList(serviceListCopy);
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
