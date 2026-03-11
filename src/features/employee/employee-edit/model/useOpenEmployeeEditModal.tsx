import { useModal } from "@app/providers";

import { EmployeeEditModal } from "../ui";

export const useOpenEmployeeEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (employeeId: string) => {
    if (!employeeId) return;

    openModal({
      title: "Редактировать сотрудника",
      isCloseOverlay: false,
      content: (
        <EmployeeEditModal employeeId={employeeId} closeModal={closeModal} />
      ),
      width: 800,
    });
  };
};
