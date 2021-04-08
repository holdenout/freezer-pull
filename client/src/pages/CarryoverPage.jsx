import {Link} from "react-router-dom";
import {useStore} from "../hooks/useStore.js";
import FoodList from "../components/FoodList.jsx";
import CarryoverCollapsibleContent from "../components/CarryoverCollapsibleContent.jsx";

export const CarryoverPage = () => {
  const [foodData] = useStore();

  return (
    <div>
      <FoodList
        foodData={foodData}
        content={(contentProps) => (
          <CarryoverCollapsibleContent {...contentProps} />
        )}
      >
        <Link className="btn submit-btn next-btn" to="/pull">
          Continue to freezer pull
        </Link>
      </FoodList>
    </div>
  );
};

export default CarryoverPage;
