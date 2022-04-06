export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function genRand(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}
