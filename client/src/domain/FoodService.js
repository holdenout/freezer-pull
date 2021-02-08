export const Food = ({name, id, category, par}) => ({
  name: name,
  id: id,
  category: category,
  par: par,
  carryover: 0,
});

export const createFood = (foodFields) => {
  return Food(foodFields);
};

export const updateCarryover = (food, carryover) => {
  return {...food, carryover};
};

export const FoodServiceFactory = () => ({
  createFood,
  updateCarryover,
});

export const foodService = FoodServiceFactory();
