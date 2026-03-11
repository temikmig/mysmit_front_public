import { useDeleteEntity } from "@shared/lib";

import { useDeleteNotificationMutation } from "../api/notificationsApi";

export const useDeleteNotification = () => {
  const { deleteEntity: deleteNotification, isLoading } = useDeleteEntity(
    useDeleteNotificationMutation,
    false,
  );

  return { deleteNotification, isLoading };
};
