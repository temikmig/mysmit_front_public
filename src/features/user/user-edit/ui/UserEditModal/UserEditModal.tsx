import { FC } from "react";

import { useUser } from "@entities/user";
import { Loader } from "@shared/ui";

import { UserEditForm } from "../UserEditForm";

interface UserEditModalProps {
  userId: string;
  closeModal?: () => void;
}

export const UserEditModal: FC<UserEditModalProps> = ({
  userId,
  closeModal,
}) => {
  const { user, isLoading } = useUser(userId);

  if (isLoading || !user) return <Loader />;

  return <UserEditForm user={user} onClose={closeModal} />;
};
