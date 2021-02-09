import {useState} from "react";
import {useStore} from "./useStore.js";
import Collapsible from "./Collapsible.jsx";
import "./FoodList.css";

export const FoodList = ({content}) => {
  const [isOpen, setOpen] = useState(null);
  const [foodData, updateState] = useStore("carryover");

  const toggleOpen = (id) => {
    setOpen(isOpen === id ? null : id);
  }

  const foodItems = foodData.map((food) => {
    return (
      <li key={food.id}>
        <Collapsible
          open={isOpen === food.id}
          header={food.name}
          content={content({food, updateState, isOpen})}
          toggleOpen={() => toggleOpen(food.id)}
        />
      </li>
    );
  });

  return (
    <div className="food-list">
      <ul className="food-items">{foodItems}</ul>
    </div>
  );
};

export default FoodList;
