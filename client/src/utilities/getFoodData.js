import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";
import sampleFoodData from "./sampleFoodData.json";

// Get sample food data and add to store
export const getFoodData = () => {
  sampleFoodData.items.forEach((item) => {
    try {
      foodStore.addFood(foodService.createFood(item));
    } catch (err) {
      console.log(err);
    }
  });
};
