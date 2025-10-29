import { baseApi } from "./baseApi";
import { Supplier } from "../common/types";

export const suppliersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupplier: builder.query<Supplier, number>({
      query: (id) => `/suppliers/${id}`,
      providesTags: ["Global"],
    }),
    getSuppliersList: builder.query<
      { suppliers: Supplier[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof Supplier;
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
        return `/suppliers/list?${params.toString()}`;
      },
    }),
    getSuppliersSearch: builder.query<
      Supplier[],
      { search?: string; limit?: number }
    >({
      query: ({ search, limit }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/suppliers/search?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    addSupplier: builder.mutation<
      Supplier,
      { name: string; contactInfo?: string }
    >({
      query: (body) => ({ url: "/suppliers/add", method: "POST", body }),
      invalidatesTags: ["Global"],
    }),
    editSupplier: builder.mutation<
      Supplier,
      { id: number; data: Partial<Supplier> }
    >({
      query: ({ id, data }) => ({
        url: `/suppliers/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    deleteSupplier: builder.mutation<{ success: boolean; id: number }, number>({
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
  useAddSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApi;
