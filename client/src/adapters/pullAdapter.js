import {pullApi as api} from "./api.js";

export const pullAdapter = {
  submitPull: (pullData, res) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).accessToken;

      api
        .post(
          "/new",
          {pullData: pullData},
          {headers: {"x-access-token": token}}
        )
        .then((response) => {
          res(null);
        })
        .catch((err) => {
          console.log(err);
          res(err);
        });
    } catch (err) {
      console.log(err);
      res(err);
    }
  },

  foodPullInfo: (sku, numberRequested, res) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).accessToken;

      api
        .get("/foodPullInfo", {
          params: {sku: sku, numberRequested: numberRequested},
          headers: {"x-access-token": token},
        })
        .then((response) => {
          res(null, response.data);
        })
        .catch((err) => {
          console.log(err);
          res(err, null);
        });
    } catch (err) {
      console.log(err);
      res(err, null);
    }
  },
};

export default pullAdapter;
