import styles from "@/styles/ServiceIcons.module.css";
import React from "react";
import ServiceIcon from "./ServiceIcon";

export default function ServiceIcons({ serviceIcons, filmTitle }) {
  if (serviceIcons) {
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
            <p>Currently</p>
            <p>unavailable</p>
            {/* <p>🤬</p> */}
          </div>
        )}
      </div>
    );
  }
}
