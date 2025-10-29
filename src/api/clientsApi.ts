import { baseApi } from "./baseApi";
import type { Client, Car, CarInput, ClientInput } from "../common/types";

export const clientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClient: builder.query<Client, string>({
      query: (id) => `/clients/${id}`,
      providesTags: ["Global"],
    }),
    getClientsList: builder.query<
      { clients: Client[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof Client;
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
        return `/clients/list?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    getClientsSearch: builder.query<
      Client[],
      { search?: string; limit?: number }
    >({
      query: ({ search, limit }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/clients/search?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    addClient: builder.mutation<Client, ClientInput>({
      query: (body) => ({ url: "/clients/add", method: "POST", body }),
      invalidatesTags: ["Global"],
    }),
    editClient: builder.mutation<Client, { id: string; data: Partial<Client> }>(
      {
        query: ({ id, data }) => ({
          url: `/clients/edit/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Global"],
      }
    ),
    deleteClient: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/clients/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
    transferClientLoyaltyBalaceReserve: builder.mutation<
      { success: boolean; message: string },
      {
        fromClientId: string;
        toClientId?: string;
        transferMode: "INCRACE" | "DECRACE" | "TRANSFER";
        amount: number;
        comment?: string;
      }
    >({
      query: (body) => ({
        url: `/clients/transfer-loyalty-balance`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
    }),
    getClientCarsSearch: builder.query<
      Car[],
      { clientId: string; search?: string; limit?: number }
    >({
      query: ({ clientId, search, limit = 5 }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/clients/${clientId}/cars/search?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    getClientCar: builder.query<Car, string>({
      query: (id) => `/clients/cars/${id}`,
      providesTags: ["Global"],
    }),
    addClientCar: builder.mutation<Car, CarInput>({
      query: ({ clientId, ...body }) => ({
        url: `/clients/${clientId}/cars/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
    }),
    editClientCar: builder.mutation<Car, { id: string; data: Partial<Car> }>({
      query: ({ id, data }) => ({
        url: `/clients/cars/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    deleteClientCar: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/clients/cars/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetClientQuery,
  useLazyGetClientQuery,
  useGetClientsListQuery,
  useGetClientsSearchQuery,
  useAddClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
  useTransferClientLoyaltyBalaceReserveMutation,
  useGetClientCarQuery,
  useLazyGetClientCarQuery,
  useGetClientCarsSearchQuery,
  useAddClientCarMutation,
  useEditClientCarMutation,
  useDeleteClientCarMutation,
} = clientsApi;
