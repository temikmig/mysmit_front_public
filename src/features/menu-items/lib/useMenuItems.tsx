import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BuildIcon from "@mui/icons-material/Build";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalculateIcon from "@mui/icons-material/Calculate";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EmergencyIcon from "@mui/icons-material/Emergency";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import TableChartIcon from "@mui/icons-material/TableChart";

import { useAuth } from "@features/auth";
import { useOpenBusinessConstsEditModal } from "@features/businessConsts";
import { SidebarMenuItemProps } from "@widgets/sidebar";

export const useMenuItems = () => {
  const { isAdmin, permissions } = useAuth();
  const businessConsts = useOpenBusinessConstsEditModal();

  const items: SidebarMenuItemProps[] = [
    ...(permissions.canViewStorage
      ? [
          {
            title: "Товары",
            icon: <ShoppingCartIcon />,
            children: [
              {
                title: "Склад",
                icon: <Inventory2Icon />,
                navTo: "/storage",
              },

              ...(isAdmin
                ? [
                    {
                      title: "Накладные",
                      icon: <ReceiptLongIcon />,
                      disabled: true,
                      navTo: "/products/purchase-invoices",
                    },
                    {
                      title: "Движения",
                      icon: <ShuffleIcon />,
                      disabled: true,
                      navTo: "/products/stock-movements",
                    },
                  ]
                : []),
              {
                title: "Инвентаризация",
                icon: <CalculateIcon />,
                disabled: true,
                navTo: "/products/inventory",
              },
            ],
          },
        ]
      : []),
    {
      title: "Чек-листы",
      icon: <ChecklistIcon />,
      navTo: "/checklists",
    },
    ...(permissions.canViewAllServices ||
    permissions.canViewClients ||
    permissions.canViewEmployees
      ? [
          {
            title: "Справочники",
            icon: <MenuBookIcon />,
            children: [
              ...(permissions.canViewAllServices
                ? [
                    {
                      title: "Услуги",
                      icon: <BuildIcon />,
                      navTo: "/directory/services",
                    },
                  ]
                : []),
              ...(permissions.canViewEmployees
                ? [
                    {
                      title: "Сотрудники",
                      icon: <BadgeIcon />,
                      navTo: "/directory/employees",
                    },
                  ]
                : []),
              ...(permissions.canViewClients
                ? [
                    {
                      title: "Клиенты",
                      icon: <PersonPinIcon />,
                      navTo: "/directory/clients",
                    },
                  ]
                : []),
              ...(isAdmin
                ? [
                    {
                      title: "Контрагенты",
                      icon: <ContactPageIcon />,
                      navTo: "/directory/suppliers",
                    },
                    {
                      title: "Источники",
                      icon: <BookmarkIcon />,
                      navTo: "/directory/client-sources",
                    },
                    {
                      title: "Статьи движений",
                      icon: <TableChartIcon />,
                      navTo: "/directory/cost-items",
                      disabled: true,
                    },
                    {
                      title: "Постоянные",
                      icon: <EmergencyIcon />,
                      onClick: businessConsts,
                    },
                  ]
                : []),
            ],
          },
          ...(isAdmin
            ? [
                {
                  title: "Финансы",
                  icon: <AttachMoneyIcon />,
                  children: [
                    {
                      title: "Балансы",
                      icon: <AccountBalanceIcon />,
                      navTo: "/finances/balances",
                      disabled: true,
                    },
                    {
                      icon: <MonetizationOnIcon />,
                      title: "Движения",
                      navTo: "/finances/money-movements",
                      disabled: true,
                    },
                  ],
                },
                {
                  title: "Бизнес-затраты",
                  icon: <BusinessCenterIcon />,
                  navTo: "/business-expenses",
                  disabled: true,
                },
                {
                  title: "Отчёты",
                  icon: <AssessmentIcon />,
                  navTo: "/reports",
                },
                {
                  title: "Пользователи",
                  icon: <PeopleIcon />,
                  navTo: "/users",
                },
              ]
            : []),
        ]
      : []),
  ];

  return items;
};
