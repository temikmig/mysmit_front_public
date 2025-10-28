export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  checklistsCount: number;
  salaryBalance: number;
  nominalSalaryBalance: number;
  lastChecklist: {
    id: string;
    createdAt: string;
    status: string;
    service: {
      id: number;
      name: string;
      color: string;
    };
  };
}
