import {useState} from "react";
import Collapsible from "./Collapsible.jsx";
import {ScrollToTopButton} from "./ScrollToTopButton.jsx";
import "./FoodList.css";

export const FoodList = ({foodData, content, children}) => {
  const [isOpen, setOpen] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredFoodData, setFilteredFoodData] = useState(foodData);

  const toggleOpen = (id) => {
    setOpen(isOpen === id ? null : id);
  };

  const handleSearch = ({target: {value: newSearch}}) => {
    setSearch(newSearch);
    setFilteredFoodData(
      foodData.filter((food) => {
        return food.name.toLowerCase().includes(newSearch.toLowerCase());
      })
    );
  };

  return (
    <div className="food-list">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <span className="clear">&#x2715;</span>
      </div>
      <ul className="food-items">
        {filteredFoodData.map((food) => {
          return (
            <li key={food.id}>
              <Collapsible
                open={isOpen === food.id}
                header={food.name}
                content={content({food, isOpen})}
                toggleOpen={() => toggleOpen(food.id)}
              />
            </li>
          );
        })}
      </ul>
      {children}
      <ScrollToTopButton />
    </div>
  );
};

export default FoodList;
