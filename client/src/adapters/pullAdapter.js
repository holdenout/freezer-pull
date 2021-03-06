import {pullApi as api} from "./api.js";

export const pullAdapter = {
  submitPull: (pullData) => api.post("/new", {pullData: pullData}),
};

export default pullAdapter;
