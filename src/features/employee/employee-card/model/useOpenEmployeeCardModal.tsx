import { ROUTES } from "@app/constants";
import { useOpenEntityModal } from "@shared/lib";

import { EmployeeCardModal } from "../ui";

export const useOpenEmployeeCardModal = () => {
  const open = useOpenEntityModal();

  return (employeeId?: string, pushUrl = false) => {
    if (!employeeId) return;

    open(
      <EmployeeCardModal employeeId={employeeId} />,
      "Сотрудник",
      employeeId,
      ROUTES.DIRECTORY.EMPLOYEES,
      pushUrl,
    );
  };
};
