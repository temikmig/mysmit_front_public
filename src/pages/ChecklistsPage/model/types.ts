import { ChecklistStatus } from "@entities/checklist";

export interface FiltersChecklists {
  status?: "all" | ChecklistStatus;
  month?: string;
}

export const ChecklistsTabEnum = {
  REJECTED: "REJECTED",
  AWAITING_SENIOR: "AWAITING_SENIOR",
  AWAITING_MANAGER: "AWAITING_MANAGER",
  APPROVED: "APPROVED",
  ALL: "all",
} as const;

export type ChecklistsTab =
  (typeof ChecklistsTabEnum)[keyof typeof ChecklistsTabEnum];
