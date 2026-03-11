import { ReactNode } from "react";

export interface PageHeaderActionItem {
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

export interface PageHeaderTabItem {
  label: string;
  value: string | number;
  badgeContent?: number;
  importantBadge?: boolean;
}
