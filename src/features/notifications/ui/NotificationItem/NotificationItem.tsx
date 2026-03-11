import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOpenChecklistCardModal } from "@features/checklist";
import {
  NotificationBody,
  useDeleteNotification,
} from "@features/notifications/model";
import { formatDateToText, isMobileRequest } from "@shared/lib";

import { NotificationBox } from "./NotificationItem.styled";

interface NotificationItemProps {
  notification: NotificationBody;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  notification,
}) => {
  const isMobile = isMobileRequest();

  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);

  const openChecklistModal = useOpenChecklistCardModal();

  const handleOpenChecklist = () => {
    if (!notification.checklistId) return;

    if (isMobile) {
      navigate(`/m/checklist/${notification.checklistId}`);
    } else openChecklistModal(notification.checklistId);

    handleDeleteNotification();
  };

  const { deleteNotification } = useDeleteNotification();

  const handleDeleteNotification = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteNotification(notification.id);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <NotificationBox>
      <Avatar>
        <NotificationsIcon />
      </Avatar>

      <Box display="flex" flexDirection="column" gap={1} flex={1}>
        <Typography variant="body2">{notification.message}</Typography>
        <Typography variant="caption">
          {formatDateToText(notification.createdAt, "datetime")}
        </Typography>
        {notification.checklistId && (
          <Button onClick={handleOpenChecklist}>Открыть чек-лист</Button>
        )}
      </Box>
      <IconButton onClick={handleDeleteNotification} disabled={isDeleting}>
        <DeleteForeverIcon />
      </IconButton>
    </NotificationBox>
  );
};
