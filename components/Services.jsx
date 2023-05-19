import styles from "@/styles/Services.module.css";
import ServiceCard from "@/subcomponents/ServiceCard";
import { useState, useEffect } from "react";

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
  servicesList,
  setServicesList,
  setServiceIdToSearch,
  clicked,
  setClicked
}) {
  const [noneSelected, setNoneSelected] = useState(true);
  

  function handleContext(e) {
    e.preventDefault();
  }

  return (
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
        {servicesList ? (
          servicesList.map((service) => {
            return (
              <ServiceCard
                key={service.id}
                isMobile={isMobile}
                serviceName={service.id}
                provider_id={service.provider_id}
                background={service.image}
                mouseMoving={mouseMoving}
                options={options}
                setOptions={setOptions}
                noneSelected={noneSelected}
                setNoneSelected={setNoneSelected}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                servicesList={servicesList}
                setServicesList={setServicesList}
                clicked={clicked}
                setClicked={setClicked}
                setServiceIdToSearch={setServiceIdToSearch}
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
