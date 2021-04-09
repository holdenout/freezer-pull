import {useState, useEffect, useRef} from "react";
import {useStore} from "../hooks/useStore.js";
import {SmallCollapsible} from "./Collapsible.jsx";
import {FoodPullInfoTable} from "./FoodPullInfoTable.jsx";

// Content for collapsibles on pull page
export const PullCollapsibleContent = ({food, isOpen, setIsLoggedIn}) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [pull, setPull] = useState(
    food.pullSubmitted
      ? food.pull
      : Math.ceil((food.par - food.carryover) / food.innerPack) * food.innerPack
  );
  const [, updatePull, updatePullSubmitted] = useStore([
    "pull",
    "pullSubmitted",
  ]);

  // Set focus on input box when collapsible opens
  const focusRef = useRef(null);
  useEffect(() => {
    if (isOpen) focusRef.current.focus();
  }, [isOpen]);

  // Update temp pull value
  const handlePullInput = (newPullAmount) => {
    if (newPullAmount >= 0) setPull(newPullAmount);
  };

  // Handle change in pull input field
  const handleChange = (event) => {
    const newVal = event.target.value === "" ? 0 : parseInt(event.target.value);
    handlePullInput(newVal);
  };

  // Save pull amount for item
  const handleSave = () => {
    const updatedFood = updatePull(food, pull);
    updatePullSubmitted(updatedFood, true);
  };

  return (
    <div className="food-content">
      <div className="pull-info">
        <div>Carryover: {food.carryover}</div>
        <div>Par: {food.par}</div>
      </div>
      <div>
        <button
          className="btn incr-decr-btn"
          onClick={() => handlePullInput(pull - food.innerPack)}
        >
          {/* fullwidth hyphen-minus unicode character */}
          &#xFF0D;
        </button>
        <input
          className="food-input"
          type="tel"
          value={pull}
          onChange={handleChange}
          ref={focusRef}
        />
        <button
          className="btn incr-decr-btn"
          onClick={() => handlePullInput(pull + food.innerPack)}
        >
          {/* fullwidth plus sign unicode character */}
          &#xFF0B;
        </button>
      </div>
      <SmallCollapsible
        open={moreInfo}
        toggleOpen={() => setMoreInfo(!moreInfo)}
      >
        <FoodPullInfoTable sku={food.sku} setIsLoggedIn={setIsLoggedIn} />
      </SmallCollapsible>
      <div>
        <button className="btn submit-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default PullCollapsibleContent;
