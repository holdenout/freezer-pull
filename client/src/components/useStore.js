import {useState, useEffect} from "react";
import * as R from "ramda";
import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";

export const useStore = (propsToUpdate = ["unknown"]) => {
  const [foodData, setFoodData] = useState(foodStore.getState());

  const foodDataSubscriber = (foodState) => setFoodData(foodState);

  useEffect(() => {
    foodStore.subscribe(foodDataSubscriber);
    return () => foodStore.unsubscribe(foodDataSubscriber);
  }, []);

  const updateState = R.curry((prop, food, updatedPropValue) => {
    try {
      const updatedFood = foodService.updateFoodProp(
        food,
        prop,
        updatedPropValue
      );
      foodStore.updateFood(updatedFood);
    } catch (err) {
      console.log(err);
    }
  });

  const stateUpdaters = R.map(updateState, propsToUpdate);

  return [foodData, ...stateUpdaters];
};
