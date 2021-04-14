export const boundNumber = (num, innerPack) => {
  if (num < 0) {
    return 0;
  } else if (num >= 255) {
    return Math.floor(255 / innerPack) * innerPack;
  } else {
    return num;
  }
};

export const roundAndBoundNumber = (num, innerPack) => {
  if (num < 0) {
    return 0;
  } else if (num >= 255) {
    return Math.floor(255 / innerPack) * innerPack;
  } else {
    return Math.ceil(num / innerPack) * innerPack;
  }
};
