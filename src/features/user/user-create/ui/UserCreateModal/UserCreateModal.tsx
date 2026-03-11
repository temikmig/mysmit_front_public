import { FC } from "react";

import { UserCreateForm } from "../UserCreateForm";

interface UserCreateModalProps {
  closeModal?: () => void;
}

export const UserCreateModal: FC<UserCreateModalProps> = ({ closeModal }) => {
  return <UserCreateForm onClose={closeModal} />;
};
