import { Navigate } from "react-router-dom";
import {
  ServicesPage,
  ClientsPage,
  SuppliersPage,
  EmployeesPage,
  ClientSourcesPage,
} from "../pages";

export const baseRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "services",
        element: <ServicesPage />,
        handle: { title: "Услуги" },
      },
      {
        path: "employees",
        element: <EmployeesPage />,
        handle: { title: "Сотрудники" },
      },
      {
        path: "clients",
        element: <ClientsPage />,
        handle: { title: "Клиенты" },
      },
      {
        path: "suppliers",
        element: <SuppliersPage />,
        handle: { title: "Поставщики" },
      },
      {
        path: "client-sources",
        element: <ClientSourcesPage />,
        handle: { title: "Источники клиентов" },
      },

      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
