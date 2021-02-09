import {useState, useEffect} from "react";
import FoodList from "./FoodList.jsx";
import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";

export const FoodListContainer = () => {
  const [foodData, setFoodData] = useState(foodStore.getState());

  const foodDataSubscriber = (foodState) => setFoodData(foodState);

  useEffect(() => {
    foodStore.subscribe(foodDataSubscriber);
    return () => foodStore.unsubscribe(foodDataSubscriber);
  }, []);

  const updateState = (food, updatedProp, updatedPropValue) => {
    try {
      const updatedFood = foodService.updateFoodProp(
        food,
        updatedProp,
        updatedPropValue
      );
      foodStore.updateFood(updatedFood);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <FoodList foodData={foodData} updateState={updateState} />
    </div>
  );
};

export default FoodListContainer;
