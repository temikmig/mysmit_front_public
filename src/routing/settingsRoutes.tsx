import { Navigate } from "react-router-dom";
import { ProfileSettingsPage, UsersPage } from "../pages";

export const settingsRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "my-profile",
        element: <ProfileSettingsPage />,
        handle: { title: "Мой профиль" },
      },
      {
        path: "users-list",
        element: <UsersPage />,
        handle: { title: "Пользователи" },
      },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
