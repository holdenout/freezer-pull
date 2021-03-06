import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {useStore} from "../useStore.js";
import FoodList from "../FoodList.jsx";

// Content to display inside collapsible
const Content = ({food, isOpen}) => {
  const [, updateCarryover] = useStore(["carryover"]);

  const focusRef = useRef(null);
  useEffect(() => {
    if (isOpen) focusRef.current.focus();
  }, [isOpen]);

  const handleCarryover = (newCarryover) => {
    if (newCarryover >= 0) updateCarryover(food, newCarryover);
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

export const CarryoverPage = () => {
  const [foodData] = useStore();

  return (
    <div>
      <FoodList
        foodData={foodData}
        content={(contentProps) => <Content {...contentProps} />}
      >
        <Link className="next" to="/pull">
          Continue to freezer pull
        </Link>
      </FoodList>
    </div>
  );
};

export default CarryoverPage;
