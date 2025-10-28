import {
  // HomeIcon,
  BoxIcon,
  ChartIcon,
  PersIcon,
  SettingsIcon,
  CheckListIcon,
  ServicesIcon,
  PurchaseInvoiceIcon,
  ShuffleIcon,
  ProductsIcon,
  DollarIcon,
  BookIcon,
  SupplierIcon,
  CoinsIcon,
  EmployeeIcon,
  UserIcon,
  UsersIcon,
  BusinessIcon,
  CalculatorIcon,
  MapIcon,
  AsteriskIcon,
  PlanIcon,
} from "../../../assets/icons";
import { SmitLogo } from "../../../assets/logo/SmitLogo";
import { useAuth, useHandlers } from "../../../common/hooks";
import { SidebarMenu } from "../../SidebarMenu";
import { SidebarMenuItemProps } from "../../SidebarMenu/SidebarMenuItem";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { handleBusinessPercentagesCard } = useHandlers();

  const { isAdmin } = useAuth();

  const menuItems: SidebarMenuItemProps[] = [
    // { title: "Дашборд", icon: <HomeIcon />, navTo: "/dashboard", dev: true },
    {
      title: "Товары",
      icon: <ProductsIcon />,
      children: [
        { title: "Склад", icon: <BoxIcon />, navTo: "/products/storage" },
        ...(isAdmin
          ? [
              {
                title: "Накладные",
                icon: <PurchaseInvoiceIcon />,
                navTo: "/products/purchase-invoices",
              },
              {
                title: "Движения",
                icon: <ShuffleIcon />,
                navTo: "/products/stock-movements",
              },
            ]
          : []),
        {
          title: "Инвентаризация",
          icon: <CalculatorIcon />,
          navTo: "/products/inventory",
        },
      ],
    },
    {
      title: "Чек-листы",
      icon: <CheckListIcon />,
      navTo: "/checklists",
    },
    ...(isAdmin
      ? [
          {
            title: "База",
            icon: <BookIcon />,
            children: [
              {
                title: "Услуги",
                icon: <ServicesIcon />,
                navTo: "/base/services",
              },
              {
                title: "Сотрудники",
                icon: <EmployeeIcon />,
                navTo: "/base/employees",
              },
              {
                title: "Клиенты",
                icon: <PersIcon />,
                navTo: "/base/clients",
              },
              {
                title: "Источники",
                icon: <MapIcon />,
                navTo: "/base/client-sources",
              },
              {
                title: "Постоянные",
                icon: <AsteriskIcon />,
                onClick: () => {
                  handleBusinessPercentagesCard();
                },
              },

              {
                title: "Поставщики",
                icon: <SupplierIcon />,
                navTo: "/base/suppliers",
              },
            ],
          },

          {
            title: "Финансы",
            icon: <DollarIcon />,
            children: [
              {
                title: "Балансы",
                icon: <ChartIcon />,
                navTo: "/finances/balances",
              },
              {
                icon: <CoinsIcon />,
                title: "Движения",
                navTo: "/finances/money-movements",
              },
            ],
          },
          {
            title: "Бизнес-затраты",
            icon: <BusinessIcon />,
            navTo: "/business-expenses",
          },
          {
            title: "Планы/отчеты",
            icon: <PlanIcon />,
            navTo: "/plans-reports",
          },
        ]
      : []),

    {
      title: "Настройки",
      icon: <SettingsIcon />,
      navTo: "/settings",
      children: [
        {
          icon: <UserIcon />,
          title: "Мой профиль",
          navTo: "/settings/my-profile",
        },
        ...(isAdmin
          ? [
              {
                title: "Пользователи",
                icon: <UsersIcon />,
                navTo: "/settings/users-list",
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoCont}>
        <SmitLogo />
      </div>
      <SidebarMenu menuItems={menuItems} />
    </aside>
  );
};
