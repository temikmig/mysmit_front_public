import { FC } from "react";

import { useEmployeeSalaryMovement } from "@entities/employee";
import { formatDateToText, moneyFormat } from "@shared/lib";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteEmployeeSalaryMovement } from "../../model";

interface EmployeeSalaryMovementDeleteModalProps {
  employeeSalaryMovementId: string;
  closeModal: () => void;
}

export const EmployeeSalaryMovementDeleteModal: FC<
  EmployeeSalaryMovementDeleteModalProps
> = ({ employeeSalaryMovementId, closeModal }) => {
  const { employeeSalaryMovement, isLoading } = useEmployeeSalaryMovement(
    employeeSalaryMovementId,
  );

  const { deleteEmployeeSalaryMovement, isLoading: isLoadingDelete } =
    useDeleteEmployeeSalaryMovement();

  const onSubmit = async () => {
    if (!employeeSalaryMovement) return;

    await deleteEmployeeSalaryMovement(employeeSalaryMovement.id);
    closeModal?.();
  };

  if (isLoading || !employeeSalaryMovement) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить движение зарплаты от ${formatDateToText(employeeSalaryMovement.movementDate, "date string")} на сумму ${moneyFormat(employeeSalaryMovement.amount)}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
