import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "@widgets/header";

import { MobileBottomNav } from "./MobileBottomNav";

export const MobileLayout = () => {
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      position="absolute"
      top={0}
      left={0}
      width="100vw"
    >
      <Header sidebarButton={false} />
      <Box flex={1} position="relative" overflow="hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
      <MobileBottomNav />
    </Box>
  );
};
