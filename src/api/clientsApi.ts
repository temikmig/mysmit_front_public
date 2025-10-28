import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { Client, Car, CarInput, ClientInput } from "../common/types";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Client", "Car"],
  endpoints: (builder) => ({
    getClient: builder.query<Client, string>({
      query: (id) => `/clients/${id}`,
      providesTags: ["Client"],
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
      providesTags: ["Client"],
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
      providesTags: ["Client"],
    }),
    addClient: builder.mutation<Client, ClientInput>({
      query: (body) => ({ url: "/clients/add", method: "POST", body }),
      invalidatesTags: ["Client"],
    }),
    editClient: builder.mutation<Client, { id: string; data: Partial<Client> }>(
      {
        query: ({ id, data }) => ({
          url: `/clients/edit/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Client"],
      }
    ),
    deleteClient: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/clients/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
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
      invalidatesTags: ["Client"],
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
    }),
    getClientCar: builder.query<Car, string>({
      query: (id) => `/clients/cars/${id}`,
      providesTags: ["Car"],
    }),
    addClientCar: builder.mutation<Car, CarInput>({
      query: ({ clientId, ...body }) => ({
        url: `/clients/${clientId}/cars/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Client", "Car"],
    }),
    editClientCar: builder.mutation<Car, { id: string; data: Partial<Car> }>({
      query: ({ id, data }) => ({
        url: `/clients/cars/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Car"],
    }),
    deleteClientCar: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/clients/cars/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
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
