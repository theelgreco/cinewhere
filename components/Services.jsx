import styles from "@/styles/Services.module.css";
import ServiceCard from "@/subcomponents/ServiceCard";
import servicesArray from "constants/services";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  setClicked,
  refs,
}) {
  const [noneSelected, setNoneSelected] = useState(true);

  function handleContext(e) {
    e.preventDefault();
  }

  return (
    <>
      <section className={styles.section}>
        <div
          className={styles.Services}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContext}
          ref={refs.services}>
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
        </div>
        <div
          title="Reset services"
          className={styles.reset}
          onMouseDown={() => {
            if (selectedServices.length) {
              setSelectedServices([]);
              setNoneSelected(true);
              setServicesList([...servicesArray]);
              setServiceIdToSearch({ id: null, add: false });
            }
          }}>
          <img src="/svg/reset_icon.svg" />
        </div>
      </section>
    </>
  );
}
