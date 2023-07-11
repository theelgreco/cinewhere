import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Trailer({ trailerPlaying, trailer }) {
  const [videoElement, setVideoElement] = useState(null);

  useEffect(() => {
    getVideoElement();
  }, []);

  async function getVideoElement() {
    const baseURL = window.location.origin;
    const res = await axios.get(`${baseURL}/api/video/${trailer}`);
    const videoElementString = res.data;

    const parser = new DOMParser();
    const html = parser.parseFromString(videoElementString, "text/html");
    const videoHTML = html.querySelector("video").outerHTML;

    setVideoElement(videoHTML);
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
  }
}
