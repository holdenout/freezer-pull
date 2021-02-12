export const Food = ({name, id, category, par}) => ({
  name: name,
  id: id,
  category: category,
  par: par,
  carryover: 0,
  pull: 0,
  pullSubmitted: false,
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
    pullSubmitted: (food, pullSubmitted) => {return {...food, pullSubmitted}},
    unknown: () => {
      throw new Error(`Food update of ${updatedProp} for ${food.name} unsuccessful.`);
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
