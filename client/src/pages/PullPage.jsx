import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useStore} from "../hooks/useStore.js";
import api from "../adapters/pullAdapter.js";
import FoodList from "../components/FoodList.jsx";
import {PullCollapsibleContent} from "../components/PullCollapsibleContent.jsx";
import {roundAndBoundNumber} from "../util/roundAndBound.js";
import loader from "../assets/coffeeLoader.gif";

export const PullPage = ({setIsLoggedIn}) => {
  const [foodData, updatePull, updatePullSubmitted] = useStore([
    "pull",
    "pullSubmitted",
  ]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // Set all unpulled items to pull par - carryover
    //   -this would be an undesired operation in practice, but
    //    is best for good data display demonstration
    const updatedData = foodData.map((food) => {
      if (!food.pullSubmitted) {
        const autoPullAmount = roundAndBoundNumber(food.par - food.carryover, food.innerPack);
        let newFood = updatePull(food, autoPullAmount);
        newFood = updatePullSubmitted(newFood, true);
        return newFood;
      } else {
        return food;
      }
    });

    setIsLoading(true);
    api.submitPull(updatedData, (err) => {
      if (err) {
        setIsLoading(false);
        setIsLoggedIn(false);
        history.push("/login", {referrer: "/pull"});
        return;
      }

      setIsLoading(false);
      history.push("/");
      return;
    });
  };

  return (
    <div>
      <FoodList
        foodData={foodData}
        fadeOnSubmit={true}
        content={(contentProps) => (
          <PullCollapsibleContent
            setIsLoggedIn={setIsLoggedIn}
            {...contentProps}
          />
        )}
      >
        {isLoading ? (
          <img className="loader" src={loader} alt="loading" />
        ) : (
          <button
            className="btn submit-btn next-btn"
            onClick={() => handleSubmit()}
          >
            Submit pull
          </button>
        )}
      </FoodList>
    </div>
  );
};

export default PullPage;
