import { createBrowserRouter, Navigate, redirect } from "react-router-dom";

import { ErrorCont } from "@features/error-cont";
import { ChecklistsPage } from "@pages/ChecklistsPage";
import { ClientSourcesPage } from "@pages/ClientSourcesPage";
import { ClientsPage } from "@pages/ClientsPage";
import { EmployeesPage } from "@pages/EmployeesPage";
import { ErrorPage } from "@pages/ErrorPage";
import { LoginPage } from "@pages/LoginPage";
import { LogoutPage } from "@pages/LogoutPage";
import { ReportsPage } from "@pages/ReportsPage";
import { ServicesPage } from "@pages/ServicesPage";
import { StoragePage } from "@pages/StoragePage";
import { SuppliersPage } from "@pages/SuppliersPage";
import { UsersPage } from "@pages/UsersPage";
import { isMobileRequest } from "@shared/lib";

import GuestRoutes from "./GuestRoute";
import { mobileRoutes } from "./MobileRoutes";
import ProtectedRoutes from "./ProtectedRoute";
import { Layout, RootLayout } from "../layout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorCont />,
      loader: ({ request }) => {
        const url = new URL(request.url);
        const pathname = url.pathname;

        const isMobile = isMobileRequest();

        if (isMobile && !pathname.startsWith("/m")) {
          return redirect("/m");
        }

        return null;
      },
      children: [
        mobileRoutes,
        {
          index: true,
          element: <Navigate to="/checklists" replace />,
        },

        {
          element: <Layout withSuspense />,
          children: [
            {
              path: "checklists/:checklistId?",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: [{ index: true, element: <ChecklistsPage /> }],
              handle: { title: "Чек-листы" },
            },
            {
              path: "storage/:productId?",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: [{ index: true, element: <StoragePage /> }],
            },
            {
              path: "directory",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: [
                {
                  path: "",
                  children: [
                    {
                      index: true,
                      element: <Navigate to="/directory/services" replace />,
                    },
                    {
                      path: "services/:serviceId?",
                      element: <ServicesPage />,
                    },
                    {
                      path: "employees/:employeeId?",
                      element: <EmployeesPage />,
                    },
                    {
                      path: "clients/:clientId?",
                      element: <ClientsPage />,
                    },
                    {
                      path: "suppliers/:supplierId?",
                      element: <SuppliersPage />,
                    },
                    {
                      path: "client-sources/:clientSourceId?",
                      element: <ClientSourcesPage />,
                    },
                    {
                      path: "*",
                      element: <Navigate to="/error/404" replace />,
                    },
                  ],
                },
              ],
            },
            {
              path: "reports/:checklistId?",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: [{ index: true, element: <ReportsPage /> }],
            },
            {
              path: "users/:userId?",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: [{ index: true, element: <UsersPage /> }],
            },
          ],
        },

        {
          path: "login",
          element: <GuestRoutes withOutlet />,
          children: [{ index: true, element: <LoginPage /> }],
        },
        {
          path: "logout",
          element: <ProtectedRoutes type="user" withOutlet />,
          children: [{ index: true, element: <LogoutPage /> }],
        },
        {
          path: "error/:code",
          element: <ErrorPage />,
        },
        { path: "*", element: <Navigate to="/error/404" replace /> },
      ],
    },
  ],
  { basename: "/" },
);
