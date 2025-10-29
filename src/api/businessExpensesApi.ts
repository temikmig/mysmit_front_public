import { baseApi } from "./baseApi";
import {
  AddBusinessExpenseInput,
  BusinessExpense,
  BusinessExpensesSummary,
  EditBusinessExpenseInput,
} from "../common/types";

export const businessExpensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinessExpenses: builder.query<BusinessExpensesSummary, void>({
      query: () => `/business-expenses`,
      providesTags: ["Global"],
    }),
    getBusinessExpenseById: builder.query<BusinessExpense, string>({
      query: (id) => `/business-expenses/${id}`,
      providesTags: ["Global"],
    }),
    addBusinessExpense: builder.mutation<
      BusinessExpense,
      AddBusinessExpenseInput
    >({
      query: (body) => ({
        url: `/business-expenses/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
    }),
    editBusinessExpense: builder.mutation<
      BusinessExpense,
      { id: string; data: EditBusinessExpenseInput }
    >({
      query: ({ id, data }) => ({
        url: `/business-expenses/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    deactivateBusinessExpense: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/business-expenses/deactivate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Global"],
    }),
    activateBusinessExpense: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/business-expenses/activate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Global"],
    }),
    deleteBusinessExpense: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/business-expenses/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetAllBusinessExpensesQuery,
  useGetBusinessExpenseByIdQuery,
  useAddBusinessExpenseMutation,
  useEditBusinessExpenseMutation,
  useDeactivateBusinessExpenseMutation,
  useActivateBusinessExpenseMutation,
  useDeleteBusinessExpenseMutation,
} = businessExpensesApi;
