import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import {
  BalanceResponse,
  MoneyMovement,
  Fund,
  MoneySource,
} from "../common/types";

export const financesApi = createApi({
  reducerPath: "financesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["MoneyMovement", "MoneySource", "Fund"],
  endpoints: (builder) => ({
    getBalance: builder.query<BalanceResponse, void>({
      query: () => "/finances/balance",
      providesTags: ["MoneySource", "Fund"],
    }),
    getMoneyMovementsList: builder.query<
      { moneyMovements: MoneyMovement[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof MoneyMovement;
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
        return `/finances/movements?${params.toString()}`;
      },
      providesTags: ["MoneyMovement"],
    }),
    getSourcesSearch: builder.query<
      MoneySource[],
      { search?: string; limit?: number }
    >({
      query: ({ search, limit }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/finances/sources?${params.toString()}`;
      },
    }),
    getFundsSearch: builder.query<
      Fund[],
      { search?: string; limit?: number; fundId?: string }
    >({
      query: ({ search, limit, fundId }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (fundId) params.append("fundId", fundId);
        if (limit) params.append("limit", String(limit));
        return `/finances/funds?${params.toString()}`;
      },
    }),
    getChildFundsSearch: builder.query<
      Fund[],
      { parentId: string; search?: string; limit?: number; fundId?: string }
    >({
      query: ({ parentId, search, limit, fundId }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (fundId) params.append("fundId", fundId);
        if (limit) params.append("limit", String(limit));
        return `/finances/funds/${parentId}/children?${params.toString()}`;
      },
    }),
    getSource: builder.query<MoneySource, string>({
      query: (id) => `/finances/source/${id}`,
      providesTags: ["MoneySource"],
    }),
    getFund: builder.query<Fund, string>({
      query: (id) => `/finances/fund/${id}`,
      providesTags: ["Fund"],
    }),
    getSalaryFund: builder.query<Fund, void>({
      query: () => `/finances/salary-fund`,
      providesTags: ["Fund"],
    }),
    getReserveFund: builder.query<Fund, void>({
      query: () => `/finances/reserve-fund`,
      providesTags: ["Fund"],
    }),
    createMovement: builder.mutation<MoneyMovement, Partial<MoneyMovement>>({
      query: (body) => ({ url: "/finances/movements", method: "POST", body }),
      invalidatesTags: ["MoneyMovement", "MoneySource", "Fund"],
    }),
    addFund: builder.mutation<Fund, { name: string; parentId?: string }>({
      query: (body) => ({ url: "/finances/funds/add", method: "POST", body }),
      invalidatesTags: ["Fund"],
    }),
    editFund: builder.mutation<Fund, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/finances/fund/${id}/edit`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Fund"],
    }),
    changeFundOrder: builder.mutation<
      { success: boolean },
      { id: string; order: number }[]
    >({
      query: (updates) => ({
        url: "finances/funds-order",
        method: "PATCH",
        body: updates,
      }),
    }),
    getMoneyMovement: builder.query<MoneyMovement, string>({
      query: (id) => `/finances/money-movement/${id}`,
      providesTags: ["MoneyMovement"],
    }),
    editMoneyMovement: builder.mutation<
      MoneyMovement,
      { id: string; data: { comment: string } }
    >({
      query: ({ id, data }) => ({
        url: `/finances/money-movement/${id}/edit`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["MoneyMovement"],
    }),
    deleteMoneyMovement: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/finances/money-movement/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MoneyMovement"],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useGetMoneyMovementsListQuery,
  useGetSourcesSearchQuery,
  useGetFundsSearchQuery,
  useGetChildFundsSearchQuery,
  useGetSourceQuery,
  useLazyGetSourceQuery,
  useGetFundQuery,
  useGetSalaryFundQuery,
  useGetReserveFundQuery,
  useCreateMovementMutation,
  useAddFundMutation,
  useEditFundMutation,
  useChangeFundOrderMutation,
  useGetMoneyMovementQuery,
  useEditMoneyMovementMutation,
  useDeleteMoneyMovementMutation,
} = financesApi;
