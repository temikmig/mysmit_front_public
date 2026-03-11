import { Box, styled } from "@mui/material";

type Props = {
  fullscreen?: boolean;
  isMobile?: boolean;
};

export const ModalGridLayoutRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullscreen" && prop !== "isMobile",
})<Props>(({ fullscreen, isMobile, theme }) => {
  if (isMobile) {
    // тупо столбик для мобилки
    return {
      display: "grid",
      gap: theme.spacing(2),
      alignItems: "start",
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `
        "main"
        "footer"
        "sidebar"
      `,
    };
  }

  // десктоп / fullscreen
  const base = {
    display: "grid",
    gap: theme.spacing(2),
    alignItems: "start",
    gridTemplateColumns: "1fr auto",
    gridTemplateAreas: `
      "main sidebar"
      "footer sidebar"
    `,
  };

  if (fullscreen) {
    base.gridTemplateColumns = "1fr 1fr auto";
    base.gridTemplateAreas = `"main footer sidebar"`;
  }

  return base;
});

export const Main = styled(Box)({
  gridArea: "main",
  minWidth: 0,
});

export const Sidebar = styled(Box)({
  gridArea: "sidebar",
  position: "sticky",
  top: 0,
  alignSelf: "start",
});

export const Footer = styled(Box)({
  gridArea: "footer",
  minWidth: 0,
});
