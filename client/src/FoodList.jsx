import sampleFoodData from './sampleFoodData.json';
import './FoodList.css';

export default function FoodList() {
  // Sort food by category then name
  const foodData = sampleFoodData.items.sort(function(a, b) {
    return a.category === b.category
      ? a.name.localeCompare(b.name)
      : a.category.localeCompare(b.category)
  });
  const foodItems = foodData.map((food) => {
    return <li key={food.id} >{food.name}</li>;
  });

  return (
    <div className="food-list">
      <ul className="food-items">
        {foodItems}
      </ul>
    </div>
  );
}
