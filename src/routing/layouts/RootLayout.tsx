import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ModalProvider } from "../../common/contexts/Modal/ModalProvider";
import { SnackbarProvider } from "../../common/contexts/Snackbar/SnackbarProvider";
import { useAuthRefresh } from "../../common/hooks/useAuthRefresh";
import { Loader } from "../../components/ui/Loader";

const LoadingScreen = ({ children }: { children: ReactNode }) => {
  const { initialized } = useAuthRefresh();

  if (!initialized) return <Loader fullscreen text />;

  return <>{children}</>;
};

export const RootLayout = () => {
  return (
    <>
      <LoadingScreen>
        <SnackbarProvider>
          <ModalProvider>
            <Outlet />
          </ModalProvider>
        </SnackbarProvider>
      </LoadingScreen>
    </>
  );
};
