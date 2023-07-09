import axios from "axios";

export default async function handler(req, res) {
  const { key } = req.query;
  const { data } = await axios.get(`http://yewtu.be/embed/${key}`);

  console.log(data);
  res.send(data);
}
