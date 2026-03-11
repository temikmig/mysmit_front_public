import { FC } from "react";

import { useUser } from "@entities/user";
import { Loader } from "@shared/ui";

import { UserPasswordForm } from "../UserPasswordForm/UserPasswordForm";

interface UserPasswordModalProps {
  userId: string;
  closeModal: () => void;
}

export const UserPasswordModal: FC<UserPasswordModalProps> = ({
  userId,
  closeModal,
}) => {
  const { user, isLoading } = useUser(userId);

  if (isLoading || !user) return <Loader />;

  return <UserPasswordForm user={user} onClose={closeModal} />;
};
