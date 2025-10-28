import { createApi } from "@reduxjs/toolkit/query/react";
import type { StockMovement } from "../common/types";
import { baseQueryWithReauth } from "./baseQuery";

export const stockMovementsApi = createApi({
  reducerPath: "stockMovementsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["StockMovement"],
  endpoints: (builder) => ({
    getStockMovements: builder.query<
      { stockMovements: StockMovement[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof StockMovement;
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
        return `/stock-movements/list?${params.toString()}`;
      },
      providesTags: ["StockMovement"],
    }),
  }),
});

export const { useGetStockMovementsQuery } = stockMovementsApi;
