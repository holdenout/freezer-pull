import {foodService} from "../domain/FoodService.js";

let almondCroissant = foodService.createFood({
  name: "Almond Croissant",
  id: "ACt",
  category: "croissant",
  par: 1,
});
let plainBagel = foodService.createFood({
  name: "Plain Bagel",
  id: "PB",
  category: "bagel",
  par: 1,
});
let everythingBagel = foodService.createFood({
  name: "Everything Bagel",
  id: "EB",
  category: "bagel",
  par: 1,
});
let blueberryMuffin = foodService.createFood({
  name: "Blueberry Muffin",
  id: "BM",
  category: "muffin",
  par: 1,
});
let brownie = foodService.createFood({
  name: "Brownie",
  id: "Br",
  category: "brownie",
  par: 1,
});

console.log(plainBagel);
plainBagel = foodService.updateCarryover(plainBagel, 3);
console.log(plainBagel);
console.log(almondCroissant, everythingBagel, blueberryMuffin, brownie);
