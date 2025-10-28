import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { ClientSource } from "../common/types";

export const clientSourcesApi = createApi({
  reducerPath: "clientSourcesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ClientSource"],
  endpoints: (builder) => ({
    getClientSource: builder.query<ClientSource, string>({
      query: (id) => `/client-sources/${id}`,
      providesTags: ["ClientSource"],
    }),

    getClientSourcesList: builder.query<
      { sources: ClientSource[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof ClientSource;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({ page = 1, limit = 10, search, sortColumn, sortOrder }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (search) params.append("search", search);
        if (sortColumn) params.append("sortColumn", String(sortColumn));
        if (sortOrder) params.append("sortOrder", sortOrder);
        return `/client-sources/list?${params.toString()}`;
      },
      providesTags: ["ClientSource"],
    }),

    getClientSourcesSearch: builder.query<
      ClientSource[],
      { search?: string; limit?: number }
    >({
      query: ({ search, limit }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/client-sources/search?${params.toString()}`;
      },
      providesTags: ["ClientSource"],
    }),

    addClientSource: builder.mutation<
      ClientSource,
      { name: string; description?: string }
    >({
      query: (body) => ({
        url: "/client-sources/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ClientSource"],
    }),

    editClientSource: builder.mutation<
      ClientSource,
      { id: string; data: Partial<ClientSource> }
    >({
      query: ({ id, data }) => ({
        url: `/client-sources/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ClientSource"],
    }),

    deleteClientSource: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/client-sources/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClientSource"],
    }),
  }),
});

export const {
  useGetClientSourceQuery,
  useLazyGetClientSourceQuery,
  useGetClientSourcesListQuery,
  useGetClientSourcesSearchQuery,
  useAddClientSourceMutation,
  useEditClientSourceMutation,
  useDeleteClientSourceMutation,
} = clientSourcesApi;
