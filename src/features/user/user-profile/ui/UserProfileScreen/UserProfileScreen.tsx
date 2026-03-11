import { FC } from "react";

import { useUser, UserDetails } from "@entities/user";
import { useAuth } from "@features/auth";
import { Loader, MobilePaper } from "@shared/ui";

import { UserProfileActions } from "../UserProfileActions";

export const UserProfileScreen: FC = () => {
  const { user: currentUser } = useAuth();

  if (!currentUser) return null;

  const userId = currentUser.id;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, isLoading } = useUser(userId);

  if (isLoading) return <Loader />;

  if (!user) return;

  return (
    <MobilePaper title="Профиль">
      <UserDetails user={user} />
      <UserProfileActions user={user} />
    </MobilePaper>
  );
};
