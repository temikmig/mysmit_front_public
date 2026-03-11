import { useModal } from "@app/providers";

import { EmployeeSalaryMovementEditModal } from "../ui";

export const useOpenEmployeeSalaryMovementEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (employeeSalaryMovementId: string) => {
    if (!employeeSalaryMovementId) return;

    openModal({
      title: "Редактировать движение",
      isCloseOverlay: false,
      content: (
        <EmployeeSalaryMovementEditModal
          employeeSalaryMovementId={employeeSalaryMovementId}
          closeModal={closeModal}
        />
      ),
      width: 400,
    });
  };
};
