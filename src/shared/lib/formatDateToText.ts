export function formatDateToText(
  date: Date | string | undefined | null,
  type:
    | "date"
    | "time"
    | "datetime"
    | "date string"
    | "time string"
    | "datetime string",
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
