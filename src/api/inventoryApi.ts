import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { CreateInventoryDto, Inventory } from "../common/types";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Inventory"],
  endpoints: (builder) => ({
    getInventory: builder.query<Inventory, string>({
      query: (id) => `/inventory/${id}`,
      providesTags: ["Inventory"],
    }),

    getInventoriesList: builder.query<
      { inventories: Inventory[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof Inventory;
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
        return `/inventory/list?${params.toString()}`;
      },
    }),

    addInventory: builder.mutation<Inventory, CreateInventoryDto>({
      query: (body) => ({
        url: "/inventory/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),

    editInventory: builder.mutation<
      Inventory,
      { id: string; data: Partial<Inventory> }
    >({
      query: ({ id, data }) => ({
        url: `/inventory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),

    confirmInventory: builder.mutation<Inventory, { id: string }>({
      query: ({ id }) => ({
        url: `/inventory/${id}/confirm`,
        method: "POST",
      }),
      invalidatesTags: ["Inventory"],
    }),

    rejectInventory: builder.mutation<
      Inventory,
      { id: string; comment: string }
    >({
      query: ({ id, comment }) => ({
        url: `/inventory/${id}/reject`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: ["Inventory"],
    }),

    deleteInventory: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/inventory/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

export const {
  useGetInventoryQuery,
  useGetInventoriesListQuery,
  useAddInventoryMutation,
  useEditInventoryMutation,
  useConfirmInventoryMutation,
  useRejectInventoryMutation,
  useDeleteInventoryMutation,
} = inventoryApi;
