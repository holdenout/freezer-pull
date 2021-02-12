import {useState} from "react";
import Collapsible from "./Collapsible.jsx";
import "./FoodList.css";

export const FoodList = ({foodData, content, children}) => {
  const [isOpen, setOpen] = useState(null);

  const toggleOpen = (id) => {
    setOpen(isOpen === id ? null : id);
  }

  const foodItems = foodData.map((food) => {
    return (
      <li key={food.id}>
        <Collapsible
          open={isOpen === food.id}
          header={food.name}
          content={content({food, isOpen})}
          toggleOpen={() => toggleOpen(food.id)}
        />
      </li>
    );
  });

  return (
    <div className="food-list">
      <ul className="food-items">{foodItems}</ul>
      {children}
    </div>
  );
};

export default FoodList;
