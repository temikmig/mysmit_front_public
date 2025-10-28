import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Layout } from "./layouts/Layout";
import ProtectedRoutes from "../common/ProtectedRoute";
import { settingsRoutes } from "./settingsRoutes";
import GuestRoutes from "../common/GuestRoute";
import { ErrorCont, ErrorPage } from "../pages/ErrorPage";
import { baseRoutes } from "./baseRoutes";
import { productsRoutes } from "./productsRoutes";
import { financesRoutes } from "./financesRoutes";
import {
  ChecklistsPage,
  StorybookPage,
  LoginPage,
  LogoutPage,
  // DashboardPage,
  BusinessExpensesPage,
  PlansReportsPage,
} from "../pages";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorCont />,
      children: [
        {
          index: true,
          element: <Navigate to="/products/storage" replace />,
        },
        {
          element: <Layout withSuspense />,
          children: [
            // {
            //   path: "dashboard",
            //   element: <ProtectedRoutes type="user" withOutlet />,
            //   children: [{ index: true, element: <DashboardPage /> }],
            //   handle: { title: "Дашборд" },
            // },
            {
              path: "dashboard",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: [
                {
                  index: true,
                  element: <Navigate to="/products/storage" replace />,
                },
              ],
              handle: { title: "Дашборд" },
            },
            {
              path: "products",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: productsRoutes,
            },
            {
              path: "checklists",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: [{ index: true, element: <ChecklistsPage /> }],
              handle: { title: "Чек-листы" },
            },
            {
              path: "business-expenses",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: [{ index: true, element: <BusinessExpensesPage /> }],
              handle: { title: "Бизнес-затраты" },
            },
            {
              path: "plans-reports",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: [{ index: true, element: <PlansReportsPage /> }],
              handle: { title: "Планы/отчеты" },
            },
            {
              path: "base",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: baseRoutes,
            },
            {
              path: "finances",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: financesRoutes,
            },
            {
              path: "settings/*",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: settingsRoutes,
            },
            {
              path: "storybook",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: [{ index: true, element: <StorybookPage /> }],
              handle: { title: "Storybook" },
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
  { basename: "/" }
);
