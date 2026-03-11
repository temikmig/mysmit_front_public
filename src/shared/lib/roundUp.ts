export const roundUp = (num: number | string, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(Number(num) * factor) / factor;
};
