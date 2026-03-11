import { useModal } from "@app/providers";

import { UserPasswordModal } from "../ui";

export const useOpenUserPasswordModal = () => {
  const { openModal, closeModal } = useModal();

  return (userId: string) => {
    if (!userId) return;

    openModal({
      title: "Изменить пароль",
      isCloseOverlay: false,
      content: <UserPasswordModal userId={userId} closeModal={closeModal} />,
    });
  };
};
