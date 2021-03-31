import api from "../adapters/foodAdapter.js";
import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";

const getFoodFromDb = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.accessToken;

  const res = await api.getAll(token);
  const allFood = res.data;
  return allFood;
};

export const populateFoodStore = async () => {
  let allFood = [];

  try {
    allFood = await getFoodFromDb();
  } catch (err) {
    console.log(err);
  }

  // Add db food to store
  allFood.forEach((item) => {
    try {
      foodStore.addFood(foodService.createFood(item));
    } catch (err) {
      // console.log(err);
      console.log("Error adding food item. ");
    }
  });
};
