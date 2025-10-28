import React from "react";

type FontSize = "small" | "medium" | "large" | "inherit" | string | number;

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  fontSize?: FontSize;
  width?: string | number;
  height?: string | number;
  color?: string;
  viewBox?: string;
  children: React.ReactNode;
}

const FONT_SIZE_MAP: Record<string, string> = {
  small: "20px",
  medium: "24px",
  large: "35px",
  inherit: "20px",
};

export const SvgIcon: React.FC<SvgIconProps> = ({
  fontSize = "20px",
  width,
  height,
  color,
  viewBox = "0 0 24 24",
  children,
  ...props
}) => {
  const mappedSize =
    typeof fontSize === "string" && FONT_SIZE_MAP[fontSize]
      ? FONT_SIZE_MAP[fontSize]
      : fontSize;

  const svgWidth = width || mappedSize || "24px";
  const svgHeight = height || mappedSize || "24px";
  const fill = color || "currentcolor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={svgWidth}
      height={svgHeight}
      fill={fill}
      {...(color ? { color } : {})}
      {...props}
    >
      {children}
    </svg>
  );
};
