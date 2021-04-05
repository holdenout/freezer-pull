import {useState, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import {useStore} from "../hooks/useStore.js";
import {SmallCollapsible} from "../components/Collapsible.jsx";
import {FoodPullInfoTable} from "../components/FoodPullInfoTable.jsx";
import api from "../adapters/pullAdapter.js";
import FoodList from "../components/FoodList.jsx";

// Content to display inside collapsible
const Content = ({food, isOpen, setIsLoggedIn}) => {
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
      <SmallCollapsible
        open={moreInfo}
        toggleOpen={() => setMoreInfo(!moreInfo)}
      >
        <FoodPullInfoTable sku={food.sku} setIsLoggedIn={setIsLoggedIn} />
      </SmallCollapsible>
      <div>
        <button className="btn submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export const PullPage = ({setIsLoggedIn}) => {
  const [foodData] = useStore();
  const history = useHistory();

  const handleSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("No signed in user");
      setIsLoggedIn(false);
      history.push("/login", {referrer: "/pull"});
      return;
    }

    const token = user.accessToken;
    try {
      await api.submitPull(data, token);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
      history.push("/login", {referrer: "/pull"});
      return;
    }
    history.push("/");
    return;
  };

  return (
    <div>
      <FoodList
        foodData={foodData}
        content={(contentProps) => (
          <Content setIsLoggedIn={setIsLoggedIn} {...contentProps} />
        )}
      >
        <button
          className="btn submit-btn next-btn"
          onClick={() => handleSubmit(foodData)}
        >
          Submit pull
        </button>
      </FoodList>
    </div>
  );
};

export default PullPage;
