import { baseApi } from "./baseApi";
import type { PurchaseInvoice, PurchaseInvoiceInput } from "../common/types";

export const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseInvoice: builder.query<PurchaseInvoice, string>({
      query: (id) => `/purchase-invoice/${id}`,
      providesTags: ["Global"],
    }),
    getPurchaseInvoicesList: builder.query<
      { invoices: PurchaseInvoice[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof PurchaseInvoice;
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
        return `/purchase-invoice/list?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    createPurchaseInvoice: builder.mutation<
      PurchaseInvoice,
      PurchaseInvoiceInput
    >({
      query: (body) => ({
        url: "/purchase-invoice",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
    }),
    cancelPurchaseInvoice: builder.mutation<
      void,
      { id: string; data: { comment: string } }
    >({
      query: ({ id, data }) => ({
        url: `/purchase-invoice/cancel/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    invalidPurchaseInvoice: builder.mutation<
      void,
      { id: string; data: { comment: string } }
    >({
      query: ({ id, data }) => ({
        url: `/purchase-invoice/invalid/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetPurchaseInvoiceQuery,
  useGetPurchaseInvoicesListQuery,
  useCreatePurchaseInvoiceMutation,
  useCancelPurchaseInvoiceMutation,
  useInvalidPurchaseInvoiceMutation,
} = purchaseApi;
