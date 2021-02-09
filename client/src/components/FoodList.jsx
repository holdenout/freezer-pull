import {useState, useEffect, useRef} from "react";
import Collapsible from "./Collapsible.jsx";
import "./FoodList.css";

const Content = ({food, updateState, isOpen}) => {
  const focusRef = useRef(null);

  useEffect(() => {
    if (isOpen) focusRef.current.focus();
  }, [isOpen]);

  const handleCarryover = (newCarryover) => {
    if (newCarryover >= 0) updateState(food, "carryover", newCarryover);
  };

  const handleChange = (event) => {
    const newVal = event.target.value === "" ? 0 : parseInt(event.target.value);
    handleCarryover(newVal);
  };

  return (
    <div className="food-content">
      <button onClick={() => handleCarryover(food.carryover - 1)}>
        &#xFF0D;
      </button>
      <input
        className="carry-over"
        type="tel"
        value={food.carryover}
        onChange={handleChange}
        ref={focusRef}
      />
      <button onClick={() => handleCarryover(food.carryover + 1)}>
        &#xFF0B;
      </button>
    </div>
  );
};

export const FoodList = ({foodData, updateState}) => {
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
              updateState={updateState}
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
