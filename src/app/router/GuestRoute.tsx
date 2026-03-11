import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@features/auth";
import { isMobileRequest } from "@shared/lib";

interface GuestRoutesProps {
  children?: JSX.Element;
  withOutlet?: boolean;
}

export default function GuestRoutes({
  children,
  withOutlet = false,
}: GuestRoutesProps) {
  const { isAuth } = useAuth();
  const isMobile = isMobileRequest();

  if (isAuth) {
    if (isMobile) {
      return <Navigate to="/m" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return withOutlet ? <Outlet /> : children;
}
