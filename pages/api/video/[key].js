import axios from "axios";
import { JSDOM } from "jsdom";

export default async function handler(req, res) {
  const { key } = req.query;
  const response = await axios.get(`http://yewtu.be/embed/${key}`);
  const html = response.data;

  const dom = new JSDOM(html);
  const { document } = dom.window;

  // Get the video element in the HTML
  const videoElement = document.querySelector("video");

  // Get all the source elements within the video element
  const sourceElements = videoElement.querySelectorAll("source");

  // Modify the URLs in the source elements
  sourceElements.forEach((source) => {
    const url = source.getAttribute("src");
    if (url && !url.startsWith("http")) {
      const updatedUrl = "https://yewtu.be" + url;
      source.setAttribute("src", updatedUrl);
    }
  });

  //update the poster url
  const poster = videoElement.getAttribute("poster");
  videoElement.setAttribute("poster", "https://yewtu.be" + poster);

  //update the video Element styles
  videoElement.style.height = "100%";
  videoElement.style.objectFit = "cover";

  const videoHTML = videoElement.outerHTML;
  // Send the video HTML element as the response
  res.send(videoHTML);
}
