import {NumberInput} from "./NumberInput.jsx";
import {useStore} from "../hooks/useStore.js";

// Content for collapsibles on carryover page
export const CarryoverCollapsibleContent = ({food, isOpen}) => {
  const [, updateCarryover] = useStore(["carryover"]);

  // Update carryover on input change
  const handleCarryoverUpdate = (newCarryover) => {
    if (newCarryover >= 0) updateCarryover(food, newCarryover);
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
        onClick={handleCarryoverUpdate}
        setFocus={isOpen}
      />
    </div>
  );
};

export default CarryoverCollapsibleContent;
