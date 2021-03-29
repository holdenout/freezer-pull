import {authApi as api} from "./api.js";

export const authAdapter = {
  signUp: (username, password) => api.post("/signUp", {username, password}),
  login: (username, password) => {
    return api.post("/login", {username, password}).then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      return res.data;
    });
  },
  verifyLogin: (token) => {
    return api.get("/verifyLogin", {headers: {"x-access-token": token}});
  },
};

export default authAdapter;
