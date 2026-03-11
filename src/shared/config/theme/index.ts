import { createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/x-data-grid/locales";

import { getComponents } from "./components";
import { palette } from "./palette";
import { shape } from "./shape";
import { getTypography } from "./typography";

let theme = createTheme({
  palette,
  shape,
});

theme = createTheme(
  theme,
  {
    typography: getTypography(theme),
    components: getComponents(theme),
  },
  ruRU,
);

export { theme };
