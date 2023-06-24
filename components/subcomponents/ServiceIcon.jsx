import { useState } from "react";
import styles from "@/styles/ServiceIcon.module.css";
import clsx from "clsx";
import { getWatchLink } from "api";

export default function ServiceIcon({ service, filmTitle }) {
  const [link, setLink] = useState(null);

  function getLink(serviceName, title) {
    if (link) return;

    setLink("fetching");
    const formattedTitle = title.split(" ").join(" ");
    const formattedServiceName = serviceName.split(" ").join(" ");
    const queryString = formattedTitle + " " + formattedServiceName;

    getWatchLink(queryString).then((res) => {
      console.log(res);
      setLink(res);
    });
  }

  return (
    <>
      {service.provider_name === "Buy" || service.provider_name === "Rent" ? (
        <div title={service.provider_name}>
          <p>{service.provider_name}</p>
          <p>+{service.amount}</p>
        </div>
      ) : (
        <a
          title={`Watch ${filmTitle} on ${service.provider_name}`}
          href={link}
          className={clsx(styles.link, {
            [styles.fetching]: link === "fetching",
            [styles.fetched]: link && link !== "fetching",
          })}
          target="_blank">
          <img
            onMouseEnter={() => {
              getLink(service.provider_name, filmTitle);
            }}
            src={`https://image.tmdb.org/t/p/w500${service.logo_path}`}
          />
        </a>
      )}
    </>
  );
}
