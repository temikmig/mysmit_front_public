import { useModal } from "@app/providers";

import { EmployeeDeleteModal } from "../ui";

export const useOpenEmployeeDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (employeeId: string) =>
    openModal({
      title: "Удалить сотрудника",

      content: (
        <EmployeeDeleteModal
          employeeId={employeeId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
