import { baseApi } from "./baseApi";
import {
  BalanceResponse,
  MoneyMovement,
  Fund,
  MoneySource,
  ProductType,
  ProductFundData,
} from "../common/types";

export const financesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<BalanceResponse, void>({
      query: () => "/finances/balance",
      providesTags: ["Global"],
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
      providesTags: ["Global"],
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
      providesTags: ["Global"],
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
      providesTags: ["Global"],
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
      providesTags: ["Global"],
    }),
    getSource: builder.query<MoneySource, string>({
      query: (id) => `/finances/source/${id}`,
      providesTags: ["Global"],
    }),
    getFund: builder.query<Fund, string>({
      query: (id) => `/finances/fund/${id}`,
      providesTags: ["Global"],
    }),
    getProductsFund: builder.query<ProductFundData, ProductType>({
      query: (type) => `/finances/product-fund/${type}`,
      providesTags: ["Global"],
    }),
    getSalaryFund: builder.query<Fund, void>({
      query: () => `/finances/salary-fund`,
      providesTags: ["Global"],
    }),
    getReserveFund: builder.query<Fund, void>({
      query: () => `/finances/reserve-fund`,
      providesTags: ["Global"],
    }),
    createMovement: builder.mutation<MoneyMovement, Partial<MoneyMovement>>({
      query: (body) => ({ url: "/finances/movements", method: "POST", body }),
      invalidatesTags: ["Global"],
    }),
    addFund: builder.mutation<Fund, { name: string; parentId?: string }>({
      query: (body) => ({ url: "/finances/funds/add", method: "POST", body }),
      invalidatesTags: ["Global"],
    }),
    editFund: builder.mutation<Fund, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/finances/fund/${id}/edit`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Global"],
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
      invalidatesTags: ["Global"],
    }),
    getMoneyMovement: builder.query<MoneyMovement, string>({
      query: (id) => `/finances/money-movement/${id}`,
      providesTags: ["Global"],
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
      invalidatesTags: ["Global"],
    }),
    deleteMoneyMovement: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/finances/money-movement/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
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
  useGetProductsFundQuery,
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
