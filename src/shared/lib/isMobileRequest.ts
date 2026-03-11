export const isMobileRequest = () => {
  if (typeof navigator === "undefined") return false;

  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};
