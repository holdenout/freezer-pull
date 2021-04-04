import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:4000"
    : "https://freezer-pull.herokuapp.com";

export const foodApi = axios.create({
  baseURL: `${baseURL}/food`,
  headers: {"Content-type": "application/json"},
});

export const pullApi = axios.create({
  baseURL: `${baseURL}/pull`,
  headers: {"Content-type": "application/json"},
});

export const authApi = axios.create({
  baseURL: `${baseURL}/auth`,
  headers: {"Content-type": "application/json"},
});
