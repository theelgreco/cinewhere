import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Trailer({ trailerPlaying, trailer }) {
  const [videoElement, setVideoElement] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    getVideoElement();
  }, []);

  async function getVideoElement() {
    const baseURL = window.location.origin;
    try {
      const res = await axios.get(`${baseURL}/api/video/${trailer}`);

      const videoElementString = res.data;

      const parser = new DOMParser();
      const html = parser.parseFromString(videoElementString, "text/html");
      const videoHTML = html.querySelector("video").outerHTML;

      setVideoElement(videoHTML);
    } catch (error) {
      setError(true);
    }
  }

  if (trailerPlaying && trailer && videoElement) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: "1",
        }}
        dangerouslySetInnerHTML={{ __html: videoElement }}></div>
    );
  } else if (error) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: "1",
          display: "grid",
          placeItems: "center",
        }}>
        <p
          style={{
            color: "#dbdbdb",
            boxShadow: "inset 0px 0px 4px 1px #00000050",
            padding: "12px",
            borderRadius: "20px",
            background: "rgb(0 0 0 /30%)",
          }}>
          No Video Found
        </p>
      </div>
    );
  }
}
