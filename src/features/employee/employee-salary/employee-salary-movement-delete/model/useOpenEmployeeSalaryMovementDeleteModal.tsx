import { useModal } from "@app/providers";

import { EmployeeSalaryMovementDeleteModal } from "../ui";

export const useOpenEmployeeSalaryMovementDeleteModal = (
  closeParent?: boolean,
) => {
  const { openModal, closeModal } = useModal();

  return (employeeSalaryMovementId: string) =>
    openModal({
      title: "Удалить движение",

      content: (
        <EmployeeSalaryMovementDeleteModal
          employeeSalaryMovementId={employeeSalaryMovementId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
