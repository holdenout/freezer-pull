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

  verifyLogin: (res) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).accessToken;

      api
        .get("/verifyLogin", {headers: {"x-access-token": token}})
        .then((response) => {
          res(null, response.status === 200);
        })
        .catch((err) => {
          console.log(err);
          res(err, false);
        });
    } catch (err) {
      console.log("No signed in user");
      res(err, false);
    }
  },
};

export default authAdapter;
