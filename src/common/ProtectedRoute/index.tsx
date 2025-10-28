import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRoutesProps {
  children?: JSX.Element;
  withOutlet?: boolean;
  type: "admin" | "user";
}

export default function ProtectedRoutes({
  children,
  withOutlet = false,
  type,
}: ProtectedRoutesProps) {
  const { isAuth, isAdmin } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  if (type === "user" && !isAuth) return <Navigate to="/login" replace />;

  if (type === "admin" && !isAdmin) return <Navigate to="/error/403" replace />;

  return withOutlet ? <Outlet /> : children;
}
