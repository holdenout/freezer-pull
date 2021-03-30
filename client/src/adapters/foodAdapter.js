import {foodApi as api} from "./api.js";

export const foodAdapter = {
  getAll: () => api.get("/all"),
  getBySku: (sku, token) => api.get(`/${sku}`, {headers: {"x-access-token": token}}),
};

export default foodAdapter;
