import {useState, useEffect} from "react";
import FoodList from "./FoodList.jsx";
import {foodStore} from "../store/FoodStore.js";
import {foodService} from "../domain/FoodService.js";

// Test data
import sampleFoodData from "./sampleFoodData.json";

export const FoodListContainer = () => {
  const [foodData, setFoodData] = useState([]);

  const foodDataSubscriber = (foodState) => setFoodData(foodState);

  // Initiate test data and subscribe to store
  useEffect(() => {
    foodStore.subscribe(foodDataSubscriber);
    sampleFoodData.items.forEach((item) => {
      try {
        foodStore.addFood(foodService.createFood(item));
      } catch (err) {
        console.log(err);
      }
    });
    return () => foodStore.unsubscribe(foodDataSubscriber);
  }, []);

  const updateCarryOver = (food, carryOver) => {
    const updatedFood = foodService.updateCarryOver(food, carryOver);
    foodStore.updateFood(updatedFood);
  };

  return (
    <div>
      <FoodList foodData={foodData} updateCarryOver={updateCarryOver} />
    </div>
  );
};

export default FoodListContainer;
