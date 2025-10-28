import { Navigate } from "react-router-dom";
import {
  StoragePage,
  PurchaseInvoicesPage,
  StockMovementsPage,
  InventoryPage,
} from "../pages";

export const productsRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "storage",
        element: <StoragePage />,
        handle: { title: "Склад" },
      },
      {
        path: "purchase-invoices",
        element: <PurchaseInvoicesPage />,
        handle: { title: "Накладные" },
      },
      {
        path: "stock-movements",
        element: <StockMovementsPage />,
        handle: { title: "Движения товаров" },
      },
      {
        path: "inventory",
        element: <InventoryPage />,
        handle: { title: "Инвентаризация" },
      },

      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
