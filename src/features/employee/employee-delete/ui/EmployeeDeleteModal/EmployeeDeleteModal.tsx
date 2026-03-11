import { FC } from "react";

import { useEmployee } from "@entities/employee";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteEmployee } from "../../model";

interface EmployeeDeleteModalProps {
  employeeId: string;
  closeModal: () => void;
}

export const EmployeeDeleteModal: FC<EmployeeDeleteModalProps> = ({
  employeeId,
  closeModal,
}) => {
  const { employee, isLoading } = useEmployee(employeeId);

  const { deleteEmployee, isLoading: isLoadingDelete } = useDeleteEmployee();

  const onSubmit = async () => {
    if (!employee) return;

    await deleteEmployee(employee.id);
    closeModal?.();
  };

  if (isLoading || !employee) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить сотрудника "${employee.firstName} ${employee.lastName}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
