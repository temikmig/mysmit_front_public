import { baseApi } from "@shared/api";

import { RefreshResponse } from "../model";

export const refreshApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({ url: "/auth/refresh", method: "POST" }),
    }),
  }),
});

export const { useRefreshMutation } = refreshApi;
