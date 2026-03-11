import { FC } from "react";

import { useUser } from "@entities/user";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteUser } from "../../model";

interface UserDeleteModalProps {
  userId: string;
  closeModal: () => void;
}

export const UserDeleteModal: FC<UserDeleteModalProps> = ({
  userId,
  closeModal,
}) => {
  const { user, isLoading } = useUser(userId);

  const { deleteUser, isLoading: isLoadingDelete } = useDeleteUser();

  const onSubmit = async () => {
    if (!user) return;

    await deleteUser(user.id);
    closeModal?.();
  };

  if (isLoading || !user) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить пользователя "${user.fullName}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
