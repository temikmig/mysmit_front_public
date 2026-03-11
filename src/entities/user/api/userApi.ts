import {
  ApiResponse,
  baseApi,
  CreateRequest,
  DeleteRequest,
  PaginatedQueryParams,
  PaginatedResponse,
  UpdateRequest,
} from "@shared/api";
import { buildQueryParams } from "@shared/lib";

import { User, UserCreateDto, UserEditDto, UserPasswordDto } from "../model";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // получить пользователя
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["Global"],
    }),
    //таблица пользователей
    getUsersList: builder.query<
      PaginatedResponse<User>,
      PaginatedQueryParams<User>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
        });

        return `/users/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),
    // создать пользователя
    createUser: builder.mutation<
      ApiResponse<User>,
      CreateRequest<UserCreateDto>
    >({
      query: ({ data }) => ({ url: "/users/add", method: "POST", body: data }),
      invalidatesTags: ["Global"],
    }),
    // редактировать пользователя
    editUser: builder.mutation<ApiResponse<User>, UpdateRequest<UserEditDto>>({
      query: ({ id, data }) => ({
        url: `/users/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // изменить пароль пользователя
    changePasswordUser: builder.mutation<
      ApiResponse,
      UpdateRequest<Partial<UserPasswordDto>>
    >({
      query: ({ id, data }) => ({
        url: `/users/change-password/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // удалить пользователя
    deleteUser: builder.mutation<ApiResponse, DeleteRequest>({
      query: (id) => ({ url: `/users/delete/${id}`, method: "DELETE" }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersListQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useChangePasswordUserMutation,
  useDeleteUserMutation,
} = userApi;
