import {foodApi as api} from "./api.js";

export const foodAdapter = {
  getAll: () => api.get("/all"),
  getBySku: (sku) => api.get(`/${sku}`),
};

export default foodAdapter;
