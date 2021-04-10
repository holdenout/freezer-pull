import {NumberInput} from "./NumberInput.jsx";
import {useStore} from "../hooks/useStore.js";

// Content for collapsibles on carryover page
export const CarryoverCollapsibleContent = ({food, isOpen}) => {
  const [, updateCarryover] = useStore(["carryover"]);

  // Update carryover on input change
  const handleCarryoverUpdate = (newCarryover) => {
    if (newCarryover < 0) updateCarryover(food, 0);
    else if (newCarryover >= 255) updateCarryover(food, 255);
    else updateCarryover(food, newCarryover);
  };

  // Handle carryover input change
  const handleInputChange = (event) => {
    const newVal = event.target.value === "" ? 0 : parseInt(event.target.value);
    handleCarryoverUpdate(newVal);
  };

  return (
    <div className="food-content">
      <NumberInput
        value={food.carryover}
        onChange={handleInputChange}
        onClickIncr={() => handleCarryoverUpdate(food.carryover + 1)}
        onClickDecr={() => handleCarryoverUpdate(food.carryover - 1)}
        setFocus={isOpen}
      />
    </div>
  );
};

export default CarryoverCollapsibleContent;
