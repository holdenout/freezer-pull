import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {useStore} from "../components/useStore.js";
import api from "../adapters/pullAdapter.js";
import FoodList from "../components/FoodList.jsx";

// Content to display inside collapsible
const Content = ({food, isOpen}) => {
  const [pull, setPull] = useState(
    food.pullSubmitted
      ? food.pull
      : Math.ceil((food.par - food.carryover) / food.innerPack) * food.innerPack
  );
  const [, updatePull, updatePullSubmitted] = useStore([
    "pull",
    "pullSubmitted",
  ]);

  const focusRef = useRef(null);
  useEffect(() => {
    if (isOpen) focusRef.current.focus();
  }, [isOpen]);

  const handlePull = (newPullAmount) => {
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
      <div className="pull-info">
        <div>Carryover: {food.carryover}</div>
        <div>Par: {food.par}</div>
      </div>
      <div>
        <button
          className="btn incr-decr-btn"
          onClick={() => handlePull(pull - food.innerPack)}
        >
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
          onClick={() => handlePull(pull + food.innerPack)}
        >
          &#xFF0B;
        </button>
      </div>
      <div>
        <button className="btn submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export const PullPage = () => {
  const [foodData] = useStore();

  const handleSubmit = async (data) => {
    try {
      await api.submitPull(data);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  };

  return (
    <div>
      <FoodList
        foodData={foodData}
        content={(contentProps) => <Content {...contentProps} />}
      >
        <Link
          className="btn submit-btn next-btn"
          to="/"
          onClick={() => handleSubmit(foodData)}
        >
          Submit pull
        </Link>
      </FoodList>
    </div>
  );
};

export default PullPage;