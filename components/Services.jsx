import styles from "@/styles/Services.module.css";
import ServiceCard from "@/subcomponents/ServiceCard";
import servicesArray from "../constants/services";
import useSWR from "swr";
import fetcher from "../pages/api/movieApi";
import { useState } from "react";

export default function Services({
  isMobile,
  handleMouseMove,
  handleMouseUp,
  mouseMoving,
  handleMouseDown,
  options,
  setOptions,
}) {
  const [noneSelected, setNoneSelected] = useState(true);

  function handleContext(e) {
    e.preventDefault();
  }

  return (
    // <div className={styles.sideText} onMouseUp={handleMouseUp}>
    //   <p>services</p>
    // </div>
    <section
      className={styles.Services}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContext}>
      <div
        id="Services"
        className={styles.servicesFlex}
        onMouseUp={handleMouseUp}>
        {servicesArray ? (
          servicesArray.map((service) => {
            return (
              <ServiceCard
                key={service.id}
                isMobile={isMobile}
                serviceName={service.id}
                background={service.image}
                mouseMoving={mouseMoving}
                options={options}
                setOptions={setOptions}
                noneSelected={noneSelected}
                setNoneSelected={setNoneSelected}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
