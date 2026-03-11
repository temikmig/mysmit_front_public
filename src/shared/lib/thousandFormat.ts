import { roundUp } from "./roundUp";

export const thousandFormat = (
  value: number | string,
  format: number = 2,
  isMoney: boolean = false,
): string => {
  if (value === null || value === undefined || value === "") {
    return isMoney ? `0.${"0".repeat(format)}` : "0";
  }

  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return isMoney ? `0.${"0".repeat(format)}` : "0";

  const rounded = roundUp(num, format);

  const [intPart, rawDecimalPart] = rounded.toString().split(".");
  const decimalPart = isMoney
    ? (rawDecimalPart || "").padEnd(format, "0")
    : rawDecimalPart;

  const intWithSpaces = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");

  return decimalPart ? `${intWithSpaces}.${decimalPart}` : intWithSpaces;
};
