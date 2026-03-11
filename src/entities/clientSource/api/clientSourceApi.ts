import {
  ApiResponse,
  baseApi,
  CreateRequest,
  DeleteRequest,
  PaginatedQueryParams,
  PaginatedResponse,
  SearchRequest,
  UpdateRequest,
} from "@shared/api";
import { buildQueryParams } from "@shared/lib";

import {
  ClientSource,
  ClientSourceCreateDto,
  ClientSourceEditDto,
  ClientSourceSearchOption,
} from "../model";

export const clientSourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //получить источник клиента
    getClientSource: builder.query<ClientSource, string>({
      query: (id) => `/client-sources/${id}`,
      providesTags: ["Global"],
    }),

    // таблица источников клиентов
    getClientSourcesList: builder.query<
      PaginatedResponse<ClientSource>,
      PaginatedQueryParams<ClientSource>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
        });

        return `/client-sources/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // поиск
    getClientSourcesSearch: builder.query<
      ClientSourceSearchOption[],
      SearchRequest
    >({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/client-sources/search?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // добавить источник клиента
    createClientSource: builder.mutation<
      ApiResponse<ClientSourceSearchOption>,
      CreateRequest<ClientSourceCreateDto>
    >({
      query: ({ data }) => ({
        url: "/client-sources/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // редактировать источник клиента
    editClientSource: builder.mutation<
      ApiResponse<ClientSource>,
      UpdateRequest<ClientSourceEditDto>
    >({
      query: ({ id, data }) => ({
        url: `/client-sources/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // удалить источник клиента
    deleteClientSource: builder.mutation<ApiResponse, DeleteRequest>({
      query: (id) => ({
        url: `/client-sources/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetClientSourceQuery,
  useLazyGetClientSourceQuery,
  useGetClientSourcesListQuery,
  useGetClientSourcesSearchQuery,
  useCreateClientSourceMutation,
  useEditClientSourceMutation,
  useDeleteClientSourceMutation,
} = clientSourceApi;
