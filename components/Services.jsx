import styles from "@/styles/Services.module.css";
import ServiceCard from "@/subcomponents/ServiceCard";
import servicesArray from "../constants/services";
import { useState } from "react";

export default function Services({
  isMobile,
  handleMouseMove,
  handleMouseUp,
  mouseMoving,
  handleMouseDown,
  options,
  setOptions,
  selectedServices,
  setSelectedServices,
}) {
  const [noneSelected, setNoneSelected] = useState(true);
  

  function handleContext(e) {
    e.preventDefault();
  }

  // useEffect(() => {
  //   console.log(selectedServices);

  //   if (selectedServices.length) {
  //     router.push({
  //       query: {
  //         services: selectedServices.join(","),
  //       },
  //     });
  //   } else {
  //     delete router.query.services;
  //     router.push({
  //       query: router.query,
  //     });
  //   }
  // }, [selectedServices]);

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
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
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
