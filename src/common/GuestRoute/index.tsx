import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface GuestRoutesProps {
  children?: JSX.Element;
  withOutlet?: boolean; // исправил опечатку
}

export default function GuestRoutes({
  children,
  withOutlet = false,
}: GuestRoutesProps) {
  const { isAuth } = useAuth();

  if (isAuth) return <Navigate to="/dashboard" replace />;

  return withOutlet ? <Outlet /> : children;
}
