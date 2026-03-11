import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import { forwardRef, MouseEvent } from "react";

import { HeaderButton } from "@widgets/header";

interface NotificationsButtonProps {
  badgeContent: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const NotificationsButton = forwardRef<
  HTMLButtonElement,
  NotificationsButtonProps
>(({ badgeContent, onClick }, ref) => {
  return (
    <HeaderButton onClick={onClick} ref={ref}>
      <Badge badgeContent={badgeContent} color="primary">
        <NotificationsIcon fontSize="small" />
      </Badge>
    </HeaderButton>
  );
});
