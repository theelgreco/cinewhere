import axios from "axios";
import { JSDOM } from "jsdom";

export default function handler(req, res) {
  const { string, region } = req.query;

  const encodedString =
    "watch+" + encodeURIComponent(string).split("%20").join("+");

  getStreamingLink(encodedString, region)
    .then((url) => {
      res.status(200).send(url);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getStreamingLink(string, region) {
  console.log(string, region);
  return axios
    .get(`https://www.google.com/search?q=${string}&gl=${region}`)
    .then((res) => {
      const html = res.data;
      const dom = new JSDOM(html);

      const doc = dom.window.document;
      const url = doc
        .querySelector(".egMi0")
        .innerHTML.split("&amp;")[0]
        .split("url?q=")[1];
      console.log(url);
      return url;
    })
    .catch((err) => {
      if (err) console.error(err);
    });
}
