import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { ModalProvider } from "@app/providers";
import { useAuthRefresh } from "@features/auth";
import { Loader } from "@shared/ui";

const LoadingScreen = ({ children }: { children: ReactNode }) => {
  const { initialized } = useAuthRefresh();

  if (!initialized) return <Loader fullscreen text />;

  return <>{children}</>;
};

export const RootLayout = () => {
  return (
    <>
      <LoadingScreen>
        {/* <SnackbarProvider> */}
        <ModalProvider>
          <Outlet />
        </ModalProvider>
        {/* </SnackbarProvider> */}
      </LoadingScreen>
    </>
  );
};
