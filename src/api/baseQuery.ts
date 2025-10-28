import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface ApiError {
  status: number;
  data: {
    msg: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // 401 → рефреш токена
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      api.dispatch({
        type: "auth/setAccessToken",
        payload: (refreshResult.data as { accessToken: string }).accessToken,
      });
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/logout" });
    }
  }

  // нормализация ошибки
  if (result.error) {
    const original = result.error as FetchBaseQueryError;
    let message = "Неизвестная ошибка";

    if (original.data && typeof original.data === "object") {
      if ("msg" in original.data && typeof original.data.msg === "string") {
        message = original.data.msg;
      } else if (
        "message" in original.data &&
        typeof original.data.message === "string"
      ) {
        message = original.data.message;
      }
    }

    return {
      error: {
        status: typeof original.status === "number" ? original.status : 500,
        data: { msg: message },
      },
    };
  }

  return result;
};
