import {foodApi as api} from "./api.js";

export const foodAdapter = {
  getAll: () => api.get("/all"),
  getById: (id) => api.get(`/${id}`)
};

export default foodAdapter;
