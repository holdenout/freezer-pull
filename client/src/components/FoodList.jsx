import {useState, useEffect, useRef} from "react";
import Collapsible from "./Collapsible.jsx";
import "./FoodList.css";

const Content = ({food, updateCarryOver, isOpen}) => {
  const focusRef = useRef(null);

  useEffect(() => {
    if (isOpen) focusRef.current.focus();
  }, [isOpen]);

  const handleCarryOver = (newCarryOver) => {
    if (newCarryOver >= 0) updateCarryOver(food, newCarryOver);
  };

  const handleChange = (event) => {
    const newVal = event.target.value === "" ? 0 : parseInt(event.target.value);
    handleCarryOver(newVal);
  };

  return (
    <div className="food-content">
      <button onClick={() => handleCarryOver(food.carryOver - 1)}>
        &#xFF0D;
      </button>
      <input
        className="carry-over"
        type="tel"
        value={food.carryOver}
        onChange={handleChange}
        ref={focusRef}
      />
      <button onClick={() => handleCarryOver(food.carryOver + 1)}>
        &#xFF0B;
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
          content={
            <Content
              food={food}
              updateCarryOver={updateCarryOver}
              isOpen={isOpen === food.id}
            />
          }
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
