import { useModal } from "@app/providers";

import { UserDeleteModal } from "../ui";

export const useOpenUserDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (userId: string) =>
    openModal({
      title: "Удалить пользователя",
      content: (
        <UserDeleteModal
          userId={userId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
