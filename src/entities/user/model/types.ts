import { ChipProps } from "@mui/material";

export const UserRoleEnum = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  SENIOR_WORKER: "SENIOR_WORKER",
  WORKER: "WORKER",
} as const;

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const ROLE_CONFIG: Record<
  UserRole,
  { label: string; color: ChipProps["color"] }
> = {
  ADMIN: {
    label: "Администратор",
    color: "error",
  },
  MANAGER: {
    label: "Менеджер",
    color: "primary",
  },
  SENIOR_WORKER: {
    label: "Старший сотрудник",
    color: "secondary",
  },
  WORKER: {
    label: "Сотрудник",
    color: "default",
  },
};

export const DEFAULT_USERPERMISSIONS: UserPermissions = {
  canViewAllServices: false,
  canViewAllChecklists: false,
  canViewStorage: false,
  canViewClients: false,
  canViewEmployees: false,
};

export const USER_ROLE_LABELS: Record<UserRole, string> = Object.fromEntries(
  Object.entries(ROLE_CONFIG).map(([key, val]) => [key, val.label]),
) as Record<UserRole, string>;

export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  userAvatar?: string | null;
  employee?: UserEmployee;
  permissions: UserPermissions;
}

export interface UserPermissions {
  canViewAllServices: boolean;
  canViewAllChecklists: boolean;
  canViewStorage: boolean;
  canViewClients: boolean;
  canViewEmployees: boolean;
}

export interface UserEmployee {
  id: string;
  firstName: string;
  lastName: string;
}

interface BaseUserDto extends UserPermissions {
  firstName: string;
  lastName: string;
  login: string;
  role: UserRole;
  employeeId: string | null;
}

export interface UserCreateDto extends BaseUserDto {
  password: string;
}

export type UserEditDto = BaseUserDto;

export interface UserPasswordDto {
  currentPassword?: string;
  newPassword: string;
  confirmPassword?: string;
}
