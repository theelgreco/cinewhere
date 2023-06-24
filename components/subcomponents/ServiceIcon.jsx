import { useState } from "react";
import styles from "@/styles/ServiceIcon.module.css";
import { getWatchLink } from "api";

export default function ServiceIcon({ service, filmTitle }) {
  const [link, setLink] = useState(null);

  function getLink(serviceName, title) {
    if (link) return;

    if (serviceName === "W4free") serviceName = "wedotv.com";
    if (serviceName === "Runtime") serviceName = "runtime.tv";
    if (serviceName === "Freevee") serviceName = "amazon freevee";
    if (serviceName === "Classix") {
      serviceName = "classix.app";
      title = "";
    }
    if (serviceName === "Starz Play Amazon Channel")
      serviceName = "amazon starz";

    setLink("fetching");
    const formattedTitle = title.split(" ").join(" ");
    const formattedServiceName = serviceName.split(" ").join(" ");
    const queryString = formattedTitle + " " + formattedServiceName;

    getWatchLink(queryString).then((res) => {
      console.log(res);
      setLink(res);
    });
  }

  /*
        w4free = wedotv.com
        runtime = runtime.tv
    */

  if (service.provider_name === "Buy" || service.provider_name === "Rent") {
    return (
      <div title={service.provider_name}>
        <p>{service.provider_name}</p>
        <p>+{service.amount}</p>
      </div>
    );
  } else if (!link) {
    return (
      <a
        title={`Watch ${filmTitle} on ${service.provider_name}`}
        style={{
          "background-image": `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
          display: "inline-block",
          width: "80%",
          "max-width": "80px",
          "border-radius": "9999px",
          "aspect-ratio": "1",
          "background-size": "contain",
          "background-position": "center",
        }}
        target="_blank"
        onMouseEnter={() => {
          getLink(service.provider_name, filmTitle);
        }}></a>
    );
  } else if (link === "fetching") {
    return (
      <a
        title={`Watch ${filmTitle} on ${service.provider_name}`}
        className={styles.fetching}
        style={{
          "background-image": `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
          display: "inline-block",
          width: "80%",
          "max-width": "80px",
          "border-radius": "9999px",
          "aspect-ratio": "1",
          "background-size": "contain",
          "background-position": "center",
        }}
        target="_blank"></a>
    );
  } else {
    return (
      <a
        title={`Watch ${filmTitle} on ${service.provider_name}`}
        className={styles.fetched}
        href={link}
        style={{
          "background-image": `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
          display: "inline-block",
          width: "80%",
          "max-width": "80px",
          "border-radius": "9999px",
          "aspect-ratio": "1",
          "background-size": "contain",
          "background-position": "center",
        }}
        target="_blank"></a>
    );
  }
}
