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

let currentToken: string | null = null;
export const updateAuthToken = (token: string) => {
  currentToken = token;
};

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (currentToken) {
      headers.set("Authorization", `Bearer ${currentToken}`);
    }

    return headers;
  },
});

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
});

let isRefreshing = false;
const failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue.length = 0;
};

const normalizeError = (error: FetchBaseQueryError): ApiError => {
  let message = "Неизвестная ошибка";
  if (error.data && typeof error.data === "object") {
    if ("msg" in error.data && typeof error.data.msg === "string") {
      message = error.data.msg;
    } else if (
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      message = error.data.message;
    }
  }
  return {
    status: error.status as number,
    data: { msg: message },
  };
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);

  if ((result.error as FetchBaseQueryError)?.status === 401) {
    if (isRefreshing) {
      try {
        const token = await new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        const request = typeof args === "string" ? { url: args } : args;
        const retryRequest: FetchArgs = {
          ...request,
          headers: {
            ...(request as FetchArgs).headers,
            Authorization: `Bearer ${token}`,
          },
        };

        const retryResult = await rawBaseQuery(retryRequest, api, extraOptions);
        if (retryResult.error) {
          return { error: normalizeError(retryResult.error) };
        }
        return retryResult;
      } catch (err) {
        return { error: normalizeError(err as FetchBaseQueryError) };
      }
    }

    isRefreshing = true;

    try {
      const refreshResult = await rawBaseQuery(
        { url: "/auth/refresh", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken } = refreshResult.data as { accessToken: string };

        api.dispatch({ type: "auth/setAccessToken", payload: accessToken });
        updateAuthToken(accessToken);

        processQueue(null, accessToken);

        const request = typeof args === "string" ? { url: args } : args;
        const retryRequest: FetchArgs = {
          ...request,
          headers: {
            ...(request as FetchArgs).headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const retryResult = await rawBaseQuery(retryRequest, api, extraOptions);
        if (retryResult.error) {
          return { error: normalizeError(retryResult.error) };
        }
        return retryResult;
      } else {
        processQueue(refreshResult.error, null);
        api.dispatch({ type: "auth/logout" });
        return { error: normalizeError(refreshResult.error!) };
      }
    } catch (err) {
      processQueue(err, null);
      api.dispatch({ type: "auth/logout" });
      return { error: normalizeError(err as FetchBaseQueryError) };
    } finally {
      isRefreshing = false;
    }
  }

  if (result.error) {
    return { error: normalizeError(result.error as FetchBaseQueryError) };
  }

  return result;
};
