import {useState} from "react";
import {useStore} from "../hooks/useStore.js";
import {SmallCollapsible} from "./Collapsible.jsx";
import {NumberInput} from "./NumberInput.jsx";
import {FoodPullInfoTable} from "./FoodPullInfoTable.jsx";
import {boundNumber, roundAndBoundNumber} from "../util/roundAndBound.js";

// Content for collapsibles on pull page
export const PullCollapsibleContent = ({food, isOpen, setIsLoggedIn}) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [pull, setPull] = useState(
    food.pullSubmitted
      ? food.pull
      : roundAndBoundNumber(food.par - food.carryover, food.innerPack)
  );
  const [, updatePull, updatePullSubmitted] = useStore([
    "pull",
    "pullSubmitted",
  ]);

  // Update temp pull value
  const handlePullInput = (newPullAmount) =>
    setPull(boundNumber(newPullAmount));

  // Handle change in pull input field
  const handleChange = (event) => {
    const newVal = event.target.value === "" ? 0 : parseInt(event.target.value);
    handlePullInput(newVal);
  };

  // Save pull amount for item
  const handleSave = () => {
    const savedPull = roundAndBoundNumber(pull, food.innerPack);

    setPull(savedPull);
    const updatedFood = updatePull(food, savedPull);
    updatePullSubmitted(updatedFood, true);
  };

  return (
    <div className="food-content">
      <div className="pull-info">
        <div>Carryover: {food.carryover}</div>
        <div>Par: {food.par}</div>
      </div>
      <div>
        <NumberInput
          value={pull}
          onChange={handleChange}
          onClickIncr={() => handlePullInput(pull + food.innerPack)}
          onClickDecr={() => handlePullInput(pull - food.innerPack)}
          setFocus={isOpen}
        />
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
