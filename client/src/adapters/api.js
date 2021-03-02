import axios from "axios";

export const foodApi = axios.create({
  baseURL: "http://localhost:4000/food"
});

export const pullApi = axios.create({
  baseURL: "http://localhost:4000/pull"
});
