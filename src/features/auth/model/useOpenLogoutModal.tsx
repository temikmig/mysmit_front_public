import { useNavigate } from "react-router-dom";

import { useModal } from "@app/providers";
import { MessageDialog } from "@shared/ui/message-dialog";

export const useOpenLogoutModal = () => {
  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();

  return () =>
    openModal({
      title: "Выход из аккаунта",
      closeButton: false,
      content: (
        <MessageDialog
          description="Вы действительно хотите выйти из аккаунта?"
          confirmButton={{
            label: "Выйти",
            onClick: () => {
              navigate("/logout");
              closeModal();
            },
          }}
          cancelButton={{ label: "Отмена", onClick: () => closeModal() }}
        />
      ),
    });
};
