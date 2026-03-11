import { useModal } from "@app/providers";

import { UserCreateModal } from "../ui";

export const useOpenUserCreateModal = () => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      title: "Создать пользователя",
      isCloseOverlay: false,
      content: <UserCreateModal closeModal={closeModal} />,
    });
  };
};
