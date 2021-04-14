import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useStore} from "../hooks/useStore.js";
import api from "../adapters/pullAdapter.js";
import FoodList from "../components/FoodList.jsx";
import {PullCollapsibleContent} from "../components/PullCollapsibleContent.jsx";
import loader from "../assets/coffeeLoader.gif";

export const PullPage = ({setIsLoggedIn}) => {
  const [foodData, updatePull, updatePullSubmitted] = useStore([
    "pull",
    "pullSubmitted",
  ]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data) => {
    // Set all unpulled items to pull par - carryover
    //   -this would be an undesired operation in practice, but
    //    is best for good data display demonstration
    foodData.forEach((food) => {
      if (!food.pullSubmitted) {
        updatePull(food, food.par - food.carryover);
        updatePullSubmitted(food, true);
      }
    });

    setIsLoading(true);
    api.submitPull(data, (err) => {
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
            onClick={() => handleSubmit(foodData)}
          >
            Submit pull
          </button>
        )}
      </FoodList>
    </div>
  );
};

export default PullPage;
