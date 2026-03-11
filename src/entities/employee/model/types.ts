import { Service } from "@entities/service";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  checklistsCount: number;
  salaryBalance: number;
  lastChecklist?: {
    id: string;
    name: string;
  };
  services: Service[];
}

export interface EmployeeCreateDto {
  firstName: string;
  lastName: string;
  phone: string | null;
  services: number[];
}

export type EmployeeEditDto = EmployeeCreateDto;

export interface EmployeeSearchOption {
  id: string;
  name: string;
  object: Employee;
}

export const EmployeeSalaryMovementTypeEnum = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
} as const;

export type EmployeeSalaryMovementType =
  (typeof EmployeeSalaryMovementTypeEnum)[keyof typeof EmployeeSalaryMovementTypeEnum];

export const EMPLOYEE_SALARY_MOVEMENT_TYPE_LABELS: Record<
  EmployeeSalaryMovementType,
  string
> = {
  INCREASE: "Пополнение",
  DECREASE: "Списание",
};

export interface EmployeeSalaryMovement {
  id: string;
  movementDate: string;
  comment: string;
  type: EmployeeSalaryMovementType;
  amount: number;
  isNotChangeBalance: boolean;
  сhecklist?: {
    id: string;
    serviceName: string;
    car: string;
    comment?: string;
    name: string;
  };
}

export interface EmployeeNewSalary {
  newSalary: number;
}

export interface EmployeeSalaryMovementCreateDto {
  employeeId: string;
  movementDate: Date | null;
  comment: string;
  type: EmployeeSalaryMovementType;
  amount: number;
  isNotChangeBalance: boolean;
}

export interface EmployeeSalaryMovementEditDto {
  movementDate: Date | null;
  comment: string;
  type: EmployeeSalaryMovementType;
  amount: number;
  isNotChangeBalance: boolean;
}
