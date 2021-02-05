export const Food = ({name, id, category, par}) => ({
  name: name,
  id: id,
  category: category,
  par: par,
  carryOver: 0
});

export const createFood = (foodFields) => {
  return Food(foodFields);
};

export const updateCarryOver = (food, carryOver) => {
  return {...food, carryOver};
}

export const FoodServiceFactory = () => ({
  createFood,
  updateCarryOver
});

export const foodService = FoodServiceFactory();
