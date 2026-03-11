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

import { Supplier, SupplierCreateDto, SupplierEditDto } from "../model";

export const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // получить контрагента
    getSupplier: builder.query<Supplier, number>({
      query: (id) => `/suppliers/${id}`,
      providesTags: ["Global"],
    }),

    //таблица контрагентов
    getSuppliersList: builder.query<
      PaginatedResponse<Supplier>,
      PaginatedQueryParams<Supplier>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
        });

        return `/suppliers/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // поиск контрагентов
    getSuppliersSearch: builder.query<
      Supplier[],
      SearchRequest & { mode: "supplier" | "contractor" | "all" }
    >({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/suppliers/search?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // добавить контрагента
    createSupplier: builder.mutation<
      ApiResponse<Supplier>,
      CreateRequest<SupplierCreateDto>
    >({
      query: ({ data }) => ({
        url: "/suppliers/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // редактировать контрагента
    editSupplier: builder.mutation<
      ApiResponse<Supplier>,
      UpdateRequest<SupplierEditDto, number>
    >({
      query: ({ id, data }) => ({
        url: `/suppliers/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // удалить контрагента
    deleteSupplier: builder.mutation<ApiResponse, DeleteRequest<number>>({
      query: (id) => ({
        url: `/suppliers/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetSupplierQuery,
  useLazyGetSupplierQuery,
  useGetSuppliersListQuery,
  useGetSuppliersSearchQuery,
  useCreateSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
