import styles from "@/styles/ServiceIcons.module.css";
import React from "react";

export default function ServiceIcons({ serviceIcons, filmTitle }) {
  return (
    <div className={styles.ServiceIcons}>
      {serviceIcons.length ? (
        serviceIcons.map((service, index) => {
          return (
            //prettier-ignore
            <React.Fragment key={`${service.provider_name}${index}${filmTitle}`}>
            {service.provider_name === 'Buy' || service.provider_name === 'Rent' 
              ? <div title={service.provider_name}>
                  <p>{service.provider_name}</p>
                  <p>+{service.amount}</p>
                </div>
              : <img src={`https://image.tmdb.org/t/p/w500${service.logo_path}`} title={service.provider_name}/> }
            
          </React.Fragment>
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
