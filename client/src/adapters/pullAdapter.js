import {pullApi as api} from "./api.js";

export const pullAdapter = {
  submitPull: (pullData, token) =>
    api.post(
      "/new",
      {pullData: pullData},
      {headers: {"x-access-token": token}}
    ),
  foodPullInfo: (sku, numberRequested, token) =>
    api.get("/foodPullInfo", {
      params: {sku: sku, numberRequested: numberRequested},
      headers: {"x-access-token": token},
    }),
};

export default pullAdapter;
