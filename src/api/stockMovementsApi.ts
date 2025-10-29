import { baseApi } from "./baseApi";
import type { StockMovement } from "../common/types";

export const stockMovementsApi = baseApi.injectEndpoints({
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
      providesTags: ["Global"],
    }),
  }),
});

export const { useGetStockMovementsQuery } = stockMovementsApi;
