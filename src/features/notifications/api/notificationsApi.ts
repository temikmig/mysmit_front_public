import { ApiResponse, baseApi, IdRequest } from "@shared/api";

import { NotificationsList } from "../model";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listNotifications: builder.query<NotificationsList, void>({
      query: () => "/notifications/list",
      providesTags: ["Notifications"],
    }),
    deleteNotification: builder.mutation<ApiResponse, IdRequest>({
      query: (id) => ({
        url: `/notifications/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsApi.util.updateQueryData(
            "listNotifications",
            undefined,
            (draft) => {
              draft.notifications = draft.notifications.filter(
                (n) => n.id !== id,
              );
              draft.total -= 1;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useDeleteNotificationMutation, useListNotificationsQuery } =
  notificationsApi;
