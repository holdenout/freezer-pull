import {useState} from "react";
import {Collapsible} from "./Collapsible.jsx";
import {ScrollToTopButton} from "./ScrollToTopButton.jsx";
import "./FoodList.css";

export const FoodList = ({foodData, content, children}) => {
  const [isOpen, setOpen] = useState(null);
  const [search, setSearch] = useState("");

  const toggleOpen = (sku) => {
    setOpen(isOpen === sku ? null : sku);
  };

  const handleSearch = ({target: {value: newSearch}}) => {
    setOpen(null);
    setSearch(newSearch);
  };

  const filteredFoodData = foodData
    .filter((food) => {
      return food.name.toLowerCase().includes(search.toLowerCase());
    })
    .map((food) => {
      return (
        <li key={food.sku}>
          <Collapsible
            open={isOpen === food.sku}
            header={food.name}
            content={content({food, isOpen})}
            toggleOpen={() => toggleOpen(food.sku)}
          />
        </li>
      );
    });

  return (
    <div className="food-list">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <span className="clear" onClick={() => setSearch("")}>
          &#x2715;
        </span>
      </div>
      <ul className="food-items">{filteredFoodData}</ul>
      {children}
      <ScrollToTopButton />
    </div>
  );
};

export default FoodList;
