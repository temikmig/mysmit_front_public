import { useModal } from "@app/providers";

import { UserEditModal } from "../ui";

export const useOpenUserEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (userId: string) => {
    if (!userId) return;

    openModal({
      title: "Редактировать профиль",
      isCloseOverlay: false,
      content: <UserEditModal userId={userId} closeModal={closeModal} />,
    });
  };
};
