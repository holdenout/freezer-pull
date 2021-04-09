import {useState} from "react";
import {Collapsible} from "./Collapsible.jsx";
import {SearchBar} from "./SearchBar.jsx";
import {ScrollToTopButton} from "./ScrollToTopButton.jsx";
import "./FoodList.css";

export const FoodList = ({foodData, fadeOnSubmit, content, children}) => {
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
            fadeHeader={food.pullSubmitted && fadeOnSubmit}
            content={content({food, isOpen})}
            toggleOpen={() => toggleOpen(food.sku)}
          />
        </li>
      );
    });

  return (
    <div className="food-list">
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        clear={() => setSearch("")}
      />
      <ul className="food-items">{filteredFoodData}</ul>
      {children}
      <ScrollToTopButton />
    </div>
  );
};

export default FoodList;
