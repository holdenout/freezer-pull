import axios from "axios";

export const foodApi = axios.create({
  baseURL: "http://localhost:4000/food",
  headers: {"Content-type": "application/json"}
});

export const pullApi = axios.create({
  baseURL: "http://localhost:4000/pull",
  headers: {"Content-type": "application/json"}
});
