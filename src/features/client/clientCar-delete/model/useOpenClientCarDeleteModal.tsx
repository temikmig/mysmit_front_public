import { useModal } from "@app/providers";

import { ClientCarDeleteModal } from "../ui";

export const useOpenClientCarDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (clientCarId: string) =>
    openModal({
      title: "Удалить автомобиль",

      content: (
        <ClientCarDeleteModal
          clientCarId={clientCarId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
