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
  Service,
  ServiceCreateDto,
  ServiceEditDto,
  ServiceSearchOption,
} from "../model";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // получить услугу
    getService: builder.query<Service, number>({
      query: (id) => `/services/${id}`,
      providesTags: ["Global"],
    }),
    // таблица услуг
    getServicesList: builder.query<
      PaginatedResponse<Service>,
      PaginatedQueryParams<Service>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
        });

        return `/services/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),
    // поиск услуг
    getServicesSearch: builder.query<ServiceSearchOption[], SearchRequest>({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/services/search?${queryString}`;
      },
      providesTags: ["Global"],
    }),
    getServicesSearchOption: builder.query<ServiceSearchOption, number>({
      query: (id) => {
        return `/services/search-option/${id}`;
      },
      providesTags: ["Global"],
    }),
    // получить id всех услуг по фильтру
    getServiceIds: builder.query<number[], { search?: string }>({
      query: (params) => ({
        url: "/services/ids",
        params,
      }),
    }),

    getServicesByIds: builder.query<Service[], number[]>({
      query: (ids) => ({
        url: "/services/by-ids",
        method: "POST",
        body: { ids },
      }),
    }),

    // создать услугу
    createService: builder.mutation<
      ApiResponse<ServiceSearchOption>,
      CreateRequest<ServiceCreateDto>
    >({
      query: ({ data }) => ({
        url: "/services/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // редактировать услугу
    editService: builder.mutation<
      ApiResponse<Service>,
      UpdateRequest<ServiceEditDto, number>
    >({
      query: ({ id, data }) => ({
        url: `/services/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // удалить услугу
    deleteService: builder.mutation<ApiResponse, DeleteRequest<number>>({
      query: (id) => ({
        url: `/services/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetServiceIdsQuery,
  useGetServicesByIdsQuery,
  useGetServicesListQuery,
  useGetServicesSearchQuery,
  useGetServicesSearchOptionQuery,
  useCreateServiceMutation,
  useEditServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
