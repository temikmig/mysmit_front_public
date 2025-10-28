import { useState } from "react";
import clsx from "clsx";
import styles from "./ColorPicker.module.css";
import { Tooltip } from "../Tooltip";
import { CheckIcon } from "../../../assets/icons";

type Color = {
  hex: string;
  name: string;
};

const defaultColors: Color[] = [
  { hex: "#0f4c81", name: "Тёмно-синий" },
  { hex: "#2a9d8f", name: "Морская волна" },
  { hex: "#8ab17d", name: "Приглушённый зелёный" },

  { hex: "#118ab2", name: "Голубой циан" },
  { hex: "#073b4c", name: "Глубокий циан" },
  { hex: "#e63946", name: "Малиновый" },

  { hex: "#e85d04", name: "Ярко-оранжевый" },
  { hex: "#ff9f1c", name: "Насыщенный оранжевый" },
  { hex: "#ff7b00", name: "Тыквенный" },
  { hex: "#f3722c", name: "Коралловый" },
  { hex: "#6a4c93", name: "Фиолетовый" },

  { hex: "#560bad", name: "Глубокий пурпур" },
  { hex: "#3f37c9", name: "Индиго" },
  { hex: "#1a1a1d", name: "Чёрный" },
];

interface ColorPickerProps {
  label: string;
  initialColor?: Color;
  onChange?: (hex: string) => void;
  colors?: Color[];
}

export const ColorPicker = ({
  label,
  initialColor,
  onChange,
  colors = defaultColors,
}: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<Color>(
    initialColor || colors[0]
  );

  const handleSelectColor = (color: Color) => {
    setSelectedColor(color);
    onChange?.(color.hex);
  };

  return (
    <div className={styles.container}>
      <p className={clsx("text_medium", styles.label)}>{label}</p>
      <div className={styles.colorsGrid}>
        {colors.map((c) => {
          const active = selectedColor.hex === c.hex;
          return (
            <Tooltip
              key={c.name}
              text={c.name}
              placement="top center"
              withArrow
              offsetY={4}
            >
              <button
                key={c.hex}
                className={clsx(
                  styles.colorItem,
                  active && clsx(styles.active, "shadow-container")
                )}
                style={{
                  backgroundColor: c.hex,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectColor(c);
                }}
              >
                {active && <CheckIcon />}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
