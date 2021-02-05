import {useState} from 'react';
import sampleFoodData from './sampleFoodData.json';
import Collapsible from './Collapsible.jsx';
import './FoodList.css';

const Content = (food) => {
  const [carryOver, setCarryOver] = useState(0);

  return (
    <>
      <button onClick={() => setCarryOver(carryOver === 0 ? 0 : carryOver - 1)}>-</button>
      <span>{carryOver}</span>
      <button onClick={() => setCarryOver(carryOver + 1)}>+</button>
    </>
  )
}

export const FoodList = () => {
  const [isOpen, setOpen] = useState(null);

  function toggleOpen(a) {
    setOpen(isOpen === a ? null : a);
  }

  // Sort food by category then name
  const foodData = sampleFoodData.items.sort(function(a, b) {
    return a.category === b.category
      ? a.name.localeCompare(b.name)
      : a.category.localeCompare(b.category)
  });

  const foodItems = foodData.map((food) => {
    return (
      <li key={food.id} >
        <Collapsible
          open={isOpen === food.id}
          header={food.name}
          content={<Content food={food} />}
          toggleOpen={() => toggleOpen(food.id)}
        />
      </li>
    );
  });

  return (
    <div className="food-list">
      <ul className="food-items">
        {foodItems}
      </ul>
    </div>
  );
}

export default FoodList;
