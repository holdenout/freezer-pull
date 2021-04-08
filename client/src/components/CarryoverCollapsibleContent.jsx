import {useEffect, useRef} from "react";
import {useStore} from "../hooks/useStore.js";

// Content for collapsibles on carryover page
export const CarryoverCollapsibleContent = ({food, isOpen}) => {
  const [, updateCarryover] = useStore(["carryover"]);

  // Set focus on input box when collapsible opens
  const focusRef = useRef(null);
  useEffect(() => {
    if (isOpen) focusRef.current.focus();
  }, [isOpen]);

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
      <button
        className="btn incr-decr-btn"
        onClick={() => handleCarryoverUpdate(food.carryover - 1)}
      >
        {/* fullwidth hyphen-minus unicode character */}
        &#xFF0D;
      </button>
      <input
        className="food-input"
        type="tel"
        value={food.carryover}
        onChange={handleInputChange}
        ref={focusRef}
      />
      <button
        className="btn incr-decr-btn"
        onClick={() => handleCarryoverUpdate(food.carryover + 1)}
      >
        {/* fullwidth plus sign unicode character */}
        &#xFF0B;
      </button>
    </div>
  );
};

export default CarryoverCollapsibleContent;
