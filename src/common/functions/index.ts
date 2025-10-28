export const getColorIndex = (id: string | number) => {
  let sum = 0;

  if (id !== undefined && id !== null) {
    const idStr = String(id);
    for (let i = 0; i < idStr.length; i++) {
      sum += idStr.charCodeAt(i);
    }
  }

  const colors = ["#FFC700", "#FC9936", "#4AC57B", "#AB7BFF"];
  const div = sum ? sum % 4 : 0;

  return colors[div];
};
export const getMonthName = (month: number): string => {
  const MONTHS = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return MONTHS[month - 1] || "Неизвестный месяц";
};

export function formatDateToText(
  date: Date | string | undefined | null,
  type:
    | "date"
    | "time"
    | "datetime"
    | "date string"
    | "time string"
    | "datetime string"
): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;

  switch (type) {
    case "date":
      return d.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    case "time":
      return d.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    case "datetime":
      return d.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    case "date string":
      return d.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    case "time string":
      return d.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    case "datetime string":
      return d.toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    default:
      return "";
  }
}

export const roundUp = (num: number | string, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(Number(num) * factor) / factor;
};

export const thousandFormat = (
  value: number | string,
  format: number = 2
): string => {
  if (value === null || value === undefined || value === "") return "0 ₽";

  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";

  const formatted = String(roundUp(num, format));

  const [intPart, decimalPart] = formatted.split(".");

  const intWithSpaces = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const result = decimalPart
    ? `${intWithSpaces}.${decimalPart}`
    : intWithSpaces;

  return result;
};

export const moneyFormat = (
  value: number | string,
  format: number = 2
): string => {
  const result = thousandFormat(value, format);

  return `${result} ₽`;
};
