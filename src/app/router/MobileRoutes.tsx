import { RouteObject, Navigate } from "react-router-dom";

import { MobileLayout } from "@app/layout";
import {
  ChecklistCardScreen,
  ChecklistCreateScreen,
  ChecklistEditScreen,
} from "@features/checklist";
import { EmployeeSalaryScreen } from "@features/employee";
import { UserProfileScreen } from "@features/user";
import { ChecklistsScreen } from "@pages/ChecklistsPage";

import ProtectedRoutes from "./ProtectedRoute";
// import { ChangePassword } from "../screens/ChangePassword";
// import { ChecklistCard } from "../screens/ChecklistCard";
// import { Checklists } from "../screens/Checklists";
// import { CreateChecklist } from "../screens/CreateChecklist";
// import { EditChecklist } from "../screens/EditChecklist";
// import { Notifications } from "../screens/Notifications";
// import { Profile } from "../screens/Profile";
// import { ProfileEdit } from "../screens/ProfileEdit";

export const mobileRoutes: RouteObject = {
  path: "m",
  element: <ProtectedRoutes type="user" withOutlet />,
  children: [
    {
      element: <MobileLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="checklists" replace />,
        },
        {
          path: "checklists",
          element: <ChecklistsScreen />,
        },
        {
          path: "checklist/:checklistId",
          element: <ChecklistCardScreen />,
        },
        {
          path: "edit-checklist/:checklistId",
          element: <ChecklistEditScreen />,
        },
        {
          path: "create-checklist",
          element: <ChecklistCreateScreen />,
        },
        // {
        //   path: "notifications",
        //   element: <Notifications />,
        // },
        {
          path: "profile",
          element: <UserProfileScreen />,
        },
        {
          path: "salary",
          element: <EmployeeSalaryScreen />,
        },
        // {
        //   path: "profile/password",
        //   element: <ChangePassword />,
        // },
      ],
    },
  ],
};
