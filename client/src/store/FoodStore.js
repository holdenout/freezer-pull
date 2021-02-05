import {update} from 'ramda';

export const addFood = (foodState, food) => foodState.concat(food);

export const updateFood = (foodState, food) => {
  const index = foodState.findIndex((f) => f.id === food.id);
  return update(index, food, foodState);
};

export const subscribe = (subscribers, subscriber) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers, subscriber) =>
  subscribers.filter((s) => s !== subscriber);

export const notify = (foodState, subscribers) =>
  subscribers.forEach((s) => s(foodState));

export const FoodStoreFactory = (() => {
  let foodState = [];
  let subscribers = [];

  return {
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
      subscribers = unsubscribe(subscriber);
    }
  }
});

export const foodStore = FoodStoreFactory();
