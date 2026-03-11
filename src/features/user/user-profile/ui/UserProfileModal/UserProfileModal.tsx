import { FC } from "react";

import { useUser, UserDetails } from "@entities/user";
import { Loader, StackColumn } from "@shared/ui";

import { UserProfileActions } from "../UserProfileActions";

interface UserProfileModalProps {
  userId: string;
}

export const UserProfileModal: FC<UserProfileModalProps> = ({ userId }) => {
  const { user, isLoading } = useUser(userId);

  if (isLoading) return <Loader />;

  if (!user) return;

  return (
    <StackColumn>
      <UserDetails user={user} />
      <UserProfileActions user={user} />
    </StackColumn>
  );
};
