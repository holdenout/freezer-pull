export const Food = ({name, id, category, par}) => ({
  name: name,
  id: id,
  category: category,
  par: par,
  carryover: 0,
  pull: 0,
});

export const createFood = (foodFields) => {
  return Object.freeze(Food(foodFields));
};

export const updateCarryover = (food, carryover) => {
  return {...food, carryover};
};

export const updatePull = (food, pull) => {
  return {...food, pull};
};

export const updateFoodProp = (food, updatedProp, updatedPropValue) => {
  const propUpdaters = {
    carryover: updateCarryover,
    pull: updatePull,
    unknown: () => {
      throw new Error("Food update unsuccessful.");
    },
  };

  return Object.freeze(
    (propUpdaters[updatedProp] ?? propUpdaters["unknown"])(
      food,
      updatedPropValue
    )
  );
};

export const FoodServiceFactory = () => ({
  createFood,
  updateFoodProp,
});

export const foodService = FoodServiceFactory();
