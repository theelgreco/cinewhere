import { useState, useRef } from "react";
import styles from "@/styles/ServiceIcon.module.css";
import { getWatchLink } from "api";
let iconStyles;

export default function ServiceIcon({ service, filmTitle, region, style }) {
  const [link, setLink] = useState(null);
  const url = useRef();

  if (style) {
    iconStyles = { ...style, cursor: "alias" };
  } else {
    iconStyles = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${service.logo_path})`,
      display: "inline-block",
      width: "80%",
      maxWidth: "80px",
      borderRadius: "9999px",
      cursor: "alias",
      aspectRatio: "1",
      backgroundSize: "contain",
      backgroundPosition: "center",
    };
  }

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

    getWatchLink(queryString, region)
      .then((res) => {
        setLink(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function simulateClick(el) {
    const event = new MouseEvent("click");
    el.dispatchEvent(event);
  }

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
        style={iconStyles}
        target="_blank"
        onClick={() => {
          getLink(service.provider_name, filmTitle);
          const interval = setInterval(() => {
            if (url.current) {
              simulateClick(url.current);
              clearInterval(interval);
            }
          }, 100);
        }}
        // onMouseEnter={() => {
        //   getLink(service.provider_name, filmTitle);
        // }}
      ></a>
    );
  } else if (link === "fetching") {
    return (
      <a
        title={`Watch ${filmTitle} on ${service.provider_name}`}
        className={styles.fetching}
        style={iconStyles}
        target="_blank"></a>
    );
  } else {
    return (
      <a
        title={`Watch ${filmTitle} on ${service.provider_name}`}
        className={styles.fetched}
        ref={url}
        href={link}
        style={iconStyles}
        target="_blank"></a>
    );
  }
}
