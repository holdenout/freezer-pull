import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import FoodList from "../FoodList.jsx";

// Content to display inside collapsible
const Content = ({food, updateState, isOpen}) => {
  const [pull, setPull] = useState(food.par - food.carryover);

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
        <button className="submit-food" onClick="">Submit (non-functional)</button>
      </div>
    </div>
  );
};

export const PullPage = () => {
  return (
    <div>
      <FoodList content={(contentProps) => <Content {...contentProps} />} propToUpdate="pull">
        <Link className="next" to="/">Submit pull (non-functional)</Link>
      </FoodList>
    </div>
  );
};

export default PullPage;
