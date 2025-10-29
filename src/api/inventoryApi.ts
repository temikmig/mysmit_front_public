import { baseApi } from "./baseApi";
import { CreateInventoryDto, Inventory } from "../common/types";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query<Inventory, string>({
      query: (id) => `/inventory/${id}`,
      providesTags: ["Global"],
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
      providesTags: ["Global"],
    }),
    addInventory: builder.mutation<Inventory, CreateInventoryDto>({
      query: (body) => ({
        url: "/inventory/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
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
      invalidatesTags: ["Global"],
    }),
    confirmInventory: builder.mutation<Inventory, { id: string }>({
      query: ({ id }) => ({
        url: `/inventory/${id}/confirm`,
        method: "POST",
      }),
      invalidatesTags: ["Global"],
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
      invalidatesTags: ["Global"],
    }),
    deleteInventory: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/inventory/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
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
