import { useEffect, useState } from "react";

export const useAnimatedNumber = (target: number, duration = 600) => {
  const [value, setValue] = useState(target);

  useEffect(() => {
    let start: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue((prev) => prev + (target - prev) * progress);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return value;
};
