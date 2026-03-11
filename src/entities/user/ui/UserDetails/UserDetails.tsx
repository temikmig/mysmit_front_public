import { Typography } from "@mui/material";
import { FC } from "react";

import { User } from "@entities/user";
import { InfoField } from "@shared/ui";

import { UserAvatar } from "../UserAvatar";
import { UserRoleBadge } from "../UserRoleBadge";
import { UserDetailsBox } from "./UserDetails.styled";

interface UserDetailsProps {
  user: User;
}

export const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  return (
    <UserDetailsBox>
      <UserAvatar user={user} size={128} />
      <Typography variant="h3">{user.fullName}</Typography>
      <InfoField label="Логин" value={`@${user.login}`} variant="row" />
      <InfoField
        variant="row"
        label="Роль в системе"
        value={<UserRoleBadge role={user.role} />}
      />
    </UserDetailsBox>
  );
};
