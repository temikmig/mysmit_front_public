import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "../common/types";
import { baseQueryWithReauth } from "./baseQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "User"],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getUserMe: builder.query<User, void>({
      query: () => "/users/me",
      providesTags: [{ type: "Me" }],
    }),
    getUsers: builder.query<
      { users: User[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof User;
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
        return `/users/list?${params.toString()}`;
      },
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: "/users/add", method: "POST", body }),
    }),
    editUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    editMe: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: "/users/edit-me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Me" }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/delete/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserMeQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useEditMeMutation,
  useDeleteUserMutation,
} = usersApi;
