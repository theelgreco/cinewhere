import styles from "@/styles/ServicesTable.module.css";
import { useEffect, useState } from "react";
import ServiceIcon from "./ServiceIcon";

export default function ServicesTable({ services, filmTitle, region }) {
  const [serviceObject, setServiceObject] = useState({
    flatrate: [],
    ads: [],
    free: [],
    rent: [],
    buy: [],
  });

  const iconStyle = {
    height: "50px",
    maxWidth: "80px",
    borderRadius: "13px",
    boxShadow: "2px 2px 4px 1px rgb(0 0 0 /50%)",
    aspectRatio: "1",
    backgroundSize: "contain",
    backgroundPosition: "center",
  };

  useEffect(() => {
    const serviceCopy = { ...serviceObject };
    for (const service in services) {
      serviceCopy[service] = services[service];
    }
    setServiceObject(serviceCopy);
  }, [services]);

  return (
    <table className={styles.demo}>
      <tbody>
        <tr>
          <th>Subscription</th>
          <td>
            <div className={styles.flex}>
              {serviceObject.flatrate.length ? (
                serviceObject.flatrate.map((service) => {
                  return (
                    <ServiceIcon
                      key={`${service.provider_name}flatrate`}
                      service={service}
                      filmTitle={filmTitle}
                      region={region}
                      style={{
                        ...iconStyle,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
                      }}
                    />
                  );
                })
              ) : (
                <p>No Results</p>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <th>free</th>
          <td>
            <div className={styles.flex}>
              {serviceObject.free.length ? (
                serviceObject.free.map((service) => {
                  return (
                    <ServiceIcon
                      key={`${service.provider_name}free`}
                      service={service}
                      filmTitle={filmTitle}
                      region={region}
                      style={{
                        ...iconStyle,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
                      }}
                    />
                  );
                })
              ) : (
                <p>No Results</p>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <th>ads</th>
          <td>
            <div className={styles.flex}>
              {serviceObject.ads.length ? (
                serviceObject.ads.map((service) => {
                  return (
                    <ServiceIcon
                      key={`${service.provider_name}ads`}
                      service={service}
                      filmTitle={filmTitle}
                      region={region}
                      style={{
                        ...iconStyle,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
                      }}
                    />
                  );
                })
              ) : (
                <p>No Results</p>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <th>rent</th>
          <td>
            <div className={styles.flex}>
              {serviceObject.rent.length ? (
                serviceObject.rent.map((service) => {
                  return (
                    <ServiceIcon
                      key={`${service.provider_name}rent`}
                      service={service}
                      filmTitle={filmTitle}
                      region={region}
                      style={{
                        ...iconStyle,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
                      }}
                    />
                  );
                })
              ) : (
                <p>No Results</p>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <th>buy</th>
          <td>
            <div className={styles.flex}>
              {serviceObject.buy.length ? (
                serviceObject.buy.map((service) => {
                  return (
                    <ServiceIcon
                      key={`${service.provider_name}buy`}
                      service={service}
                      filmTitle={filmTitle}
                      region={region}
                      style={{
                        ...iconStyle,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
                      }}
                    />
                  );
                })
              ) : (
                <p>No Results</p>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
