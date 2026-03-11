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
  Car,
  Client,
  ClientCarCreateDto,
  ClientCarEditDto,
  ClientCarSearchOption,
  ClientCreateDto,
  ClientEditDto,
  ClientSearchOption,
} from "../model";

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // получить клиента
    getClient: builder.query<Client, string>({
      query: (id) => `/clients/${id}`,
      providesTags: ["Global"],
    }),

    // таблица клиентов
    getClientsList: builder.query<
      PaginatedResponse<Client>,
      PaginatedQueryParams<Client>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
        });

        return `/clients/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // поиск клиентов
    getClientsSearch: builder.query<ClientSearchOption[], SearchRequest>({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/clients/search?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    getClientsSearchOption: builder.query<ClientSearchOption, string>({
      query: (id) => {
        return `/clients/search-option/${id}`;
      },
      providesTags: ["Global"],
    }),

    // добавить клиента
    createClient: builder.mutation<
      ApiResponse<ClientSearchOption>,
      CreateRequest<ClientCreateDto>
    >({
      query: ({ data }) => ({
        url: "/clients/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // редактировать клиента
    editClient: builder.mutation<
      ApiResponse<Client>,
      UpdateRequest<ClientEditDto>
    >({
      query: ({ id, data }) => ({
        url: `/clients/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // удалить клиента
    deleteClient: builder.mutation<ApiResponse, DeleteRequest>({
      query: (id) => ({
        url: `/clients/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
    // получить автомобиль
    getClientCar: builder.query<Car, string>({
      query: (id) => `/clients/cars/${id}`,
      providesTags: ["Global"],
    }),
    // добавить автомобиль
    createClientCar: builder.mutation<
      ApiResponse<ClientCarSearchOption>,
      CreateRequest<ClientCarCreateDto>
    >({
      query: ({ data }) => ({
        url: `/clients/${data.clientId}/cars/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // редактировать автомобиль
    editClientCar: builder.mutation<
      ApiResponse<Car>,
      UpdateRequest<ClientCarEditDto>
    >({
      query: ({ id, data }) => ({
        url: `/clients/cars/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    // удалить автомобиль
    deleteClientCar: builder.mutation<ApiResponse, DeleteRequest>({
      query: (id) => ({
        url: `/clients/cars/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),

    getClientCarsSearch: builder.query<
      ClientCarSearchOption[],
      SearchRequest & { clientId: string }
    >({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/clients/${params.clientId}/cars/search?${queryString.toString()}`;
      },
      providesTags: ["Global"],
    }),

    getClientCarsSearchOption: builder.query<ClientCarSearchOption, string>({
      query: (id) => {
        return `/clients/car-search-option/${id}`;
      },
      providesTags: ["Global"],
    }),

    // transferClientLoyaltyBalaceReserve: builder.mutation<
    //   { success: boolean; message: string },
    //   {
    //     movementDate: string;
    //     fromClientId: string;
    //     toClientId?: string;
    //     transferMode: "INCRACE" | "DECRACE" | "TRANSFER";
    //     amount: number;
    //     comment?: string;
    //   }
    // >({
    //   query: (body) => ({
    //     url: `/clients/transfer-loyalty-balance`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Global"],
    // }),
    // getClientCarsSearch: builder.query<
    //   Car[],
    //   { clientId: string; search?: string; limit?: number }
    // >({
    //   query: ({ clientId, search, limit = 5 }) => {
    //     const params = new URLSearchParams();
    //     if (search) params.append("search", search);
    //     if (limit) params.append("limit", String(limit));
    //     return `/clients/${clientId}/cars/search?${params.toString()}`;
    //   },
    //   providesTags: ["Global"],
    // }),
    // getClientCar: builder.query<Car, string>({
    //   query: (id) => `/clients/cars/${id}`,
    //   providesTags: ["Global"],
    // }),
    // addClientCar: builder.mutation<Car, CarInput>({
    //   query: ({ clientId, ...body }) => ({
    //     url: `/clients/${clientId}/cars/add`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Global"],
    // }),
    // editClientCar: builder.mutation<Car, { id: string; data: Partial<Car> }>({
    //   query: ({ id, data }) => ({
    //     url: `/clients/cars/edit/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Global"],
    // }),
    // deleteClientCar: builder.mutation<{ success: boolean }, string>({
    //   query: (id) => ({
    //     url: `/clients/cars/delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Global"],
    // }),
  }),
});

export const {
  useGetClientQuery,
  useLazyGetClientQuery,
  useGetClientsListQuery,
  useGetClientsSearchQuery,
  useGetClientsSearchOptionQuery,
  useCreateClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
  useGetClientCarQuery,
  useGetClientCarsSearchQuery,
  useGetClientCarsSearchOptionQuery,
  useCreateClientCarMutation,
  useEditClientCarMutation,
  useDeleteClientCarMutation,
  // useTransferClientLoyaltyBalaceReserveMutation,
  // useGetClientCarQuery,
  // useLazyGetClientCarQuery,
  // useGetClientCarsSearchQuery,
  // useAddClientCarMutation,
  // useEditClientCarMutation,
  // useDeleteClientCarMutation,
} = clientApi;
