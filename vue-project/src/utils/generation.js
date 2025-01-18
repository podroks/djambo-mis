export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export function generateUID() {
  return "id" + new Date().getTime() + getRandom(0, 20000);
}
