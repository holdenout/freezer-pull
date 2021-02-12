import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {useStore} from "../useStore.js";
import FoodList from "../FoodList.jsx";

// Content to display inside collapsible
const Content = ({food, isOpen}) => {
  const [pull, setPull] = useState(food.pullSubmitted ? food.pull : food.par - food.carryover);
  const [, updatePull, updatePullSubmitted] = useStore(["pull", "pullSubmitted"])

  const focusRef = useRef(null);
  useEffect(() => {
    if (isOpen) focusRef.current.focus();
  }, [isOpen]);

  const handlePull = (newPullAmount) => {
    // if (newPullAmount >= 0) updateState(food, newPullAmount);
    if (newPullAmount >= 0) setPull(newPullAmount);
  };

  const handleChange = (event) => {
    const newVal = event.target.value === "" ? 0 : parseInt(event.target.value);
    handlePull(newVal);
  };

  const handleSubmit = () => {
    const updatedFood = updatePull(food, pull);
    updatePullSubmitted(updatedFood, true);
  };

  return (
    <div className="food-content">
      <div className="info">
        <div>Carryover: {food.carryover}</div><div>Par: {food.par}</div>
      </div>
      <div>
        <button onClick={() => handlePull(pull - 1)}>
          &#xFF0D;
        </button>
        <input
          className="pull"
          type="tel"
          value={pull}
          onChange={handleChange}
          ref={focusRef}
        />
        <button onClick={() => handlePull(pull + 1)}>
          &#xFF0B;
        </button>
      </div>
      <div>
        <button className="submit-food" onClick={handleSubmit}>Submit (non-functional)</button>
      </div>
    </div>
  );
};

export const PullPage = () => {
  const [foodData] = useStore();

  return (
    <div>
      <FoodList foodData={foodData} content={(contentProps) => <Content {...contentProps} />}>
        <Link className="next" to="/">Submit pull (non-functional)</Link>
      </FoodList>
    </div>
  );
};

export default PullPage;
