export const pluralForm = (n: number, forms: [string, string, string]) => {
  const num = Math.abs(n) % 100;
  const num1 = num % 10;

  if (num > 10 && num < 20) return forms[2];
  if (num1 > 1 && num1 < 5) return forms[1];
  if (num1 === 1) return forms[0];
  return forms[2];
};
