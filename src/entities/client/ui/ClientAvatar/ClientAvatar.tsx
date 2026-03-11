import { Avatar, AvatarProps } from "@mui/material";

import { Client } from "@entities/client/model";

interface ClientAvatarProps extends Omit<AvatarProps, "src"> {
  client: Client;
  size?: number;
}

export const ClientAvatar = ({
  client,
  size = 48,
  ...rest
}: ClientAvatarProps) => {
  const initials = `${client.firstName?.[0] ?? ""}${
    client.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <Avatar {...rest} sx={{ width: size, height: size, fontSize: size / 3 }}>
      {initials}
    </Avatar>
  );
};
