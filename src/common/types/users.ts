export const UserRoleEnum = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  SENIOR_WORKER: "SENIOR_WORKER",
  WORKER: "WORKER",
} as const;

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  SENIOR_WORKER: "Старший сотрудник",
  WORKER: "Сотрудник",
};

export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  password?: string;
  userAvatar?: string | null;
  createdAt: string;
  updatedAt: string;
}
