import { Box, Popover, Typography } from "@mui/material";
import { useState } from "react";

import { useListNotificationsQuery } from "@features/notifications/api";

import { NotificationItem } from "../NotificationItem";
import { NotificationsButton } from "../NotificationsButton";

export const NotificationsPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data } = useListNotificationsQuery();

  if (!data) return null;

  return (
    <>
      <NotificationsButton
        badgeContent={data.total}
        aria-describedby={id}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {data.notifications.length > 0 ? (
          data.notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <Box padding={2}>
            <Typography variant="subtitle1">Уведомления отсутствуют</Typography>
          </Box>
        )}
      </Popover>
    </>
  );
};
