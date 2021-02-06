import {useState} from "react";
import Collapsible from "./Collapsible.jsx";
import "./FoodList.css";

const Content = ({food, updateCarryOver}) => {
  const handleCarryOver = (newCarryOver) => {
    if (newCarryOver >= 0) updateCarryOver(food, newCarryOver);
  };

  return (
    <div className="food-content">
      <button onClick={() => handleCarryOver(food.carryOver - 1)}>
        &#x2796;
      </button>
      <span>{food.carryOver}</span>
      <button onClick={() => handleCarryOver(food.carryOver + 1)}>
        &#x2795;
      </button>
    </div>
  );
};

export const FoodList = ({foodData, updateCarryOver}) => {
  const [isOpen, setOpen] = useState(null);

  function toggleOpen(a) {
    setOpen(isOpen === a ? null : a);
  }

  const foodItems = foodData.map((food) => {
    return (
      <li key={food.id}>
        <Collapsible
          open={isOpen === food.id}
          header={food.name}
          content={<Content food={food} updateCarryOver={updateCarryOver} />}
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
