import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { PurchaseInvoice, PurchaseInvoiceInput } from "../common/types";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["PurchaseInvoice", "Supplier", "Product"],
  endpoints: (builder) => ({
    getPurchaseInvoice: builder.query<PurchaseInvoice, string>({
      query: (id) => `/purchase-invoice/${id}`,
      providesTags: ["PurchaseInvoice"],
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
      invalidatesTags: ["PurchaseInvoice", "Product", "Supplier"],
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
      invalidatesTags: ["PurchaseInvoice", "Product", "Supplier"],
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
      invalidatesTags: ["PurchaseInvoice", "Product", "Supplier"],
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
