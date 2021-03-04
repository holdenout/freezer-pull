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

  // Rename keys
  allFood = allFood.reduce((acc, curr) => {
    let {inner_pack: innerPack, ...rest} = curr;
    return acc.concat([{innerPack, ...rest}]);
  }, []);

  // Add db food to store
  allFood.forEach((item) => {
    try {
      foodStore.addFood(foodService.createFood(item));
    } catch (err) {
      console.log(err);
    }
  });
};
