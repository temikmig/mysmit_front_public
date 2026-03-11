import { useModal } from "@app/providers";
import { EmployeeSearchOption } from "@entities/employee";

import { EmployeeCreateModal } from "../ui";

interface useOpenEmoloyeeCreateModalOptions {
  onSuccess?: (clientSource: EmployeeSearchOption) => void;
}

export const useOpenEmployeeCreateModal = (
  options?: useOpenEmoloyeeCreateModalOptions,
) => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      title: "Добавить сотрудника",
      isCloseOverlay: false,
      content: (
        <EmployeeCreateModal
          onSuccess={(employee) => {
            options?.onSuccess?.(employee);
          }}
          closeModal={closeModal}
        />
      ),
      width: 800,
    });
  };
};
