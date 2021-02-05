import {foodService} from "../domain/FoodService.js";
import {foodStore} from "../store/FoodStore.js";

const almondCroissant = foodService.createFood({
  name: "Almond Croissant",
  id: "ACt",
  category: "croissant",
  par: 1,
});
const plainBagel = foodService.createFood({
  name: "Plain Bagel",
  id: "PB",
  category: "bagel",
  par: 1,
});
const everythingBagel = foodService.createFood({
  name: "Everything Bagel",
  id: "EB",
  category: "bagel",
  par: 1,
});
const blueberryMuffin = foodService.createFood({
  name: "Blueberry Muffin",
  id: "BM",
  category: "muffin",
  par: 1,
});
const brownie = foodService.createFood({
  name: "Brownie",
  id: "Br",
  category: "brownie",
  par: 1,
});

const sub1 = (foodState) => {
  console.log("sub1 new state:", foodState);
};
// const sub2 = (foodState) => {
//   console.log("sub2 new state:", foodState);
// };

foodStore.subscribe(sub1);
// foodStore.subscribe(sub2);

foodStore.addFood(almondCroissant);
foodStore.addFood(plainBagel);
foodStore.addFood(everythingBagel);
foodStore.addFood(blueberryMuffin);
foodStore.addFood(brownie);

foodStore.updateFood(foodService.updateCarryOver(almondCroissant, 3));
