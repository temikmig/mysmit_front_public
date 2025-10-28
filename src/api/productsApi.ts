import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  Product,
  ProductAddForm,
  ProductBatch,
  ProductEditForm,
  ProductType,
  ProductWriteOffForm,
  WriteoffPriceHistory,
} from "../common/types";
import { baseQueryWithReauth } from "./baseQuery";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductsList: builder.query<
      { products: Product[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof Product;
        sortOrder?: "asc" | "desc";
        visibility?: "active" | "hidden" | "all";
        stock?: "positive" | "empty" | "all";
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        search,
        sortColumn,
        sortOrder,
        visibility,
        stock,
      }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (search) params.append("search", search);
        if (sortColumn) params.append("sortColumn", String(sortColumn));
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (visibility) params.append("visibility", visibility);
        if (stock) params.append("stock", stock);
        return `/products/list?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getProductsSearch: builder.query<
      Product[],
      { search?: string; limit?: number }
    >({
      query: ({ search, limit }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/products/search?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getProductsByType: builder.query<Product[], ProductType>({
      query: (type) => `/products?type=${type}`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProductBatches: builder.query<
      { batches: ProductBatch[]; total: number },
      {
        productId: number;
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof ProductBatch;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({ productId, page = 1, limit = 10, sortColumn, sortOrder }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (sortColumn) params.append("sortColumn", String(sortColumn));
        if (sortOrder) params.append("sortOrder", sortOrder);
        return `/products/${productId}/batches?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<Product, ProductAddForm>({
      query: (body) => ({ url: "/products/add", method: "POST", body }),
      invalidatesTags: ["Product"],
    }),
    editProduct: builder.mutation<
      Product,
      { id: number; data: ProductEditForm }
    >({
      query: ({ id, data }) => ({
        url: `/products/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({ url: `/products/delete/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
    activeProduct: builder.mutation<void, number>({
      query: (id) => ({ url: `/products/to-active/${id}`, method: "PATCH" }),
      invalidatesTags: ["Product"],
    }),
    hideProduct: builder.mutation<void, number>({
      query: (id) => ({ url: `/products/to-hide/${id}`, method: "PATCH" }),
      invalidatesTags: ["Product"],
    }),
    editProductWriteOffPrice: builder.mutation<
      ProductWriteOffForm,
      { id: number; data: Partial<ProductWriteOffForm> }
    >({
      query: ({ id, data }) => ({
        url: `/products/edit-writeoff/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getWriteoffPriceHistory: builder.query<WriteoffPriceHistory, number>({
      query: (id) => `/products/${id}/writeoff-price-history/`,
      providesTags: ["Product"],
    }),
    transferProductsReserve: builder.mutation<
      { success: boolean; message: string },
      {
        fromProductId: number;
        toProductId: number;
        amount: number;
        comment?: string;
      }
    >({
      query: (body) => ({
        url: `/products/transfer-reserve`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsListQuery,
  useGetProductsSearchQuery,
  useGetProductsByTypeQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductBatchesQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useActiveProductMutation,
  useHideProductMutation,
  useEditProductWriteOffPriceMutation,
  useGetWriteoffPriceHistoryQuery,
  useTransferProductsReserveMutation,
} = productsApi;
