import {authApi as api} from "./api.js";

export const authAdapter = {
  signUp: (username, password) => api.post("/signUp", {username, password}),
};

export default authAdapter;
