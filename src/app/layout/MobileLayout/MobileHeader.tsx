import { ArrowBack } from "@mui/icons-material";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { RedlineLogo } from "@shared/assets";

const ROOT_PATHS = [
  "/m/checklists",
  "/m/create-checklist",
  "/m/notifications",
  "/m/profile",
];

export const MobileHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = !ROOT_PATHS.includes(location.pathname);

  return (
    <AppBar
      position="static"
      sx={{
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toolbar sx={{ px: 1, width: "100%", position: "relative" }}>
        {showBackButton && (
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              color: "white",
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <RedlineLogo />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
