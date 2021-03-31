import {foodApi as api} from "./api.js";

export const foodAdapter = {
  getAll: (token) => api.get("/all", {headers: {"x-access-token": token}}),
  getBySku: (sku, token) =>
    api.get(`/${sku}`, {headers: {"x-access-token": token}}),
};

export default foodAdapter;
