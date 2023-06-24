import styles from "@/styles/ServiceIcons.module.css";
import React from "react";
import ServiceIcon from "./ServiceIcon";

export default function ServiceIcons({ serviceIcons, filmTitle }) {
  return (
    <div className={styles.ServiceIcons}>
      {serviceIcons.length ? (
        serviceIcons.map((service, index) => {
          return (
            <ServiceIcon
              key={`${service.provider_name}${index}${filmTitle}`}
              service={service}
              filmTitle={filmTitle}
            />
          );
        })
      ) : (
        <div className={styles.noServices}>
          {/* <p>0</p>
          <p>services</p> */}
        </div>
      )}
    </div>
  );
}
