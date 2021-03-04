import * as R from "ramda";

export const addFood = (foodState, food) => {
  const sortByCategoryThenName = R.sortWith([
    R.ascend(R.compose(R.toLower, R.prop("category"))),
    R.ascend(R.compose(R.toLower, R.prop("name"))),
  ]);

  // Throw error if food exists by SKU
  if (R.none((f) => f.sku === food.sku, foodState)) {
    return sortByCategoryThenName(foodState.concat(food));
  } else {
    throw new Error(
      `Food item '${food.sku}: ${food.name} (${food.code})' exists.`
    );
  }
};

export const updateFood = (foodState, food) => {
  const index = foodState.findIndex((f) => f.sku === food.sku);
  return R.update(index, food, foodState);
};

export const subscribe = (subscribers, subscriber) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers, subscriber) =>
  subscribers.filter((s) => s !== subscriber);

export const notify = (foodState, subscribers) =>
  subscribers.forEach((s) => s(foodState));

export const FoodStoreFactory = () => {
  let foodState = Object.freeze([]);
  let subscribers = Object.freeze([]);

  return {
    getState: () => foodState,
    addFood: (food) => {
      foodState = addFood(foodState, food);
      notify(foodState, subscribers);
    },
    updateFood: (food) => {
      foodState = updateFood(foodState, food);
      notify(foodState, subscribers);
    },
    subscribe: (subscriber) => {
      subscribers = subscribe(subscribers, subscriber);
      return subscriber;
    },
    unsubscribe: (subscriber) => {
      subscribers = unsubscribe(subscribers, subscriber);
    },
  };
};

export const foodStore = FoodStoreFactory();
