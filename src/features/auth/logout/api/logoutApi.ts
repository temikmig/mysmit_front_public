import { baseApi } from "@shared/api";

export const logoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
