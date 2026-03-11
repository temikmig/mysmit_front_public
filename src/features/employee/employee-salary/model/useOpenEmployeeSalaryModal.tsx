import { useModal } from "@app/providers";

import { EmployeeSalaryModal } from "../ui";

export const useOpenEmployeeSalaryModal = () => {
  const { openModal } = useModal();

  return (employeeId?: string) => {
    if (!employeeId) return;

    openModal({
      title: "Зарплатный баланс сотрудника",
      content: <EmployeeSalaryModal employeeId={employeeId} />,
      width: 400,
    });
  };
};
