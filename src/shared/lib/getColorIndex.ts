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
