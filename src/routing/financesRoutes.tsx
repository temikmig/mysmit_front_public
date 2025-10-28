import { Navigate } from "react-router-dom";
import { MoneyMovementsPage, BalancesPage } from "../pages";

export const financesRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "money-movements",
        element: <MoneyMovementsPage />,
        handle: { title: "История движения денежных средств" },
      },
      {
        path: "balances",
        element: <BalancesPage />,
        handle: { title: "Балансы" },
      },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
