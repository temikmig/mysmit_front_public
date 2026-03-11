import { baseApi } from "@shared/api";

import { LoginDto, LoginResponse } from "../model";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginDto>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
