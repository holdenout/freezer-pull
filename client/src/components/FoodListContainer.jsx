import {useState, useEffect} from "react";
import FoodList from "./FoodList.jsx";
import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";

export const FoodListContainer = () => {
  const [foodData, setFoodData] = useState(foodStore.getState());

  const foodDataSubscriber = (foodState) => setFoodData(foodState);

  // Initiate test data and subscribe to store
  useEffect(() => {
    foodStore.subscribe(foodDataSubscriber);
    return () => foodStore.unsubscribe(foodDataSubscriber);
  }, []);

  const updateCarryover = (food, carryover) => {
    const updatedFood = foodService.updateCarryover(food, carryover);
    foodStore.updateFood(updatedFood);
  };

  return (
    <div>
      <FoodList foodData={foodData} updateCarryover={updateCarryover} />
    </div>
  );
};

export default FoodListContainer;
