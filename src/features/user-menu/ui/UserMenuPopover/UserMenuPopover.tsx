import { Popover } from "@mui/material";
import { useState } from "react";

import { useAuth } from "@features/auth";
import { useUserMenuItems } from "@features/user-menu/model";

import { UserMenu } from "../UserMenu";
import { UserMenuButton } from "../UserMenuButton";

export const UserMenuPopover = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useAuth();

  const menuItems = useUserMenuItems();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (!user) return;
  return (
    <>
      <UserMenuButton user={user} onClick={handleOpen} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <UserMenu user={user} items={menuItems} />
      </Popover>
    </>
  );
};
