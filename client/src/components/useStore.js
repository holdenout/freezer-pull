import {useState, useEffect} from "react";
import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";

export const useStore = (propToUpdate = "unknown") => {
  const [foodData, setFoodData] = useState(foodStore.getState());

  const foodDataSubscriber = (foodState) => setFoodData(foodState);

  useEffect(() => {
    foodStore.subscribe(foodDataSubscriber);
    return () => foodStore.unsubscribe(foodDataSubscriber);
  }, []);

  const updateState = (food, updatedPropValue) => {
    try {
      const updatedFood = foodService.updateFoodProp(
        food,
        propToUpdate,
        updatedPropValue
      );
      foodStore.updateFood(updatedFood);
    } catch (err) {
      console.log(err);
    }
  };

  return [foodData, updateState];
};
