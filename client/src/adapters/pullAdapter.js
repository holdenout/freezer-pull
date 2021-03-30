import {pullApi as api} from "./api.js";

export const pullAdapter = {
  submitPull: (pullData, token) =>
    api.post(
      "/new",
      {pullData: pullData},
      {headers: {"x-access-token": token}}
    ),
};

export default pullAdapter;
