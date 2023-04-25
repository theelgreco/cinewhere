import axios from "axios";

const key = "120295f81bmshef2922b0bc8ec70p1bf2acjsnf91e520d2110";
const host = "streaming-availability.p.rapidapi.com";

// const options = {
//   url: "https://streaming-availability.p.rapidapi.com/v2/search/basic",
//   params: {
//     country: "gb",
//     services: "netflix,prime",
//     output_language: "en",
//     show_type: "movie",
//     genre: "18",
//     show_original_language: "en",
//     keyword: "zombie",
//   },
// };

const fetcher = (options) =>
  axios.request(options).then((res) => {
    return res.data.result;
  });

module.exports = fetcher;
