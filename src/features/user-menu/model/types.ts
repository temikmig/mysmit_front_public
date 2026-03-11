import { ReactNode } from "react";

type UserMenuItemId =
  | "profileCard"
  | "profileEdit"
  | "profilePassword"
  | "salary"
  | "logout";

export interface UserMenuItem {
  id: UserMenuItemId;
  label: string;
  icon: ReactNode;
}
