import { thousandFormat } from "./thousandFormat";

export const moneyFormat = (
  value: number | string,
  format: number = 2,
): string => {
  const result = thousandFormat(value, format, true);
  return `${result}\u00A0₽`;
};
