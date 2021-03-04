import api from "../adapters/foodAdapter.js";
import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";

const getFoodFromDb = async () => {
  const res = await api.getAll();
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
      console.log(err);
    }
  });
};
