export const formatMinutes = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} мин`;
  }

  const hours = minutes / 60;
  if (hours < 8) {
    return `${Math.floor(hours * 10) / 10} ч`;
  }

  const days = hours / 8;
  if (days < 30) {
    return `${Math.floor(days * 10) / 10} дн`;
  }

  const months = days / 30;
  if (months < 12) {
    return `${Math.floor(months * 10) / 10} мес`;
  }

  const years = months / 12;
  return `${Math.floor(years * 10) / 10} г`;
};
