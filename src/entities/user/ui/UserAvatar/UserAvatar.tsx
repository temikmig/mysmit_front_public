import { Avatar, AvatarProps } from "@mui/material";

import { User } from "@entities/user/model";

interface UserAvatarProps extends Omit<AvatarProps, "src"> {
  user: User;
  size?: number;
}

export const UserAvatar = ({ user, size = 48, ...rest }: UserAvatarProps) => {
  const initials = `${user.firstName?.[0] ?? ""}${
    user.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <Avatar
      {...rest}
      sx={{ width: size, height: size, fontSize: size / 3 }}
      src={user.userAvatar || undefined}
    >
      {!user.userAvatar && initials}
    </Avatar>
  );
};
