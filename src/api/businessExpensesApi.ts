import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import {
  AddBusinessExpenseInput,
  BusinessExpense,
  BusinessExpensesSummary,
  EditBusinessExpenseInput,
} from "../common/types";

export const businessExpensesApi = createApi({
  reducerPath: "businessExpensesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["BusinessExpense"],
  endpoints: (builder) => ({
    getAllBusinessExpenses: builder.query<BusinessExpensesSummary, void>({
      query: () => `/business-expenses`,
      providesTags: ["BusinessExpense"],
    }),
    getBusinessExpenseById: builder.query<BusinessExpense, string>({
      query: (id) => `/business-expenses/${id}`,
      providesTags: ["BusinessExpense"],
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
      invalidatesTags: ["BusinessExpense"],
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
      invalidatesTags: ["BusinessExpense"],
    }),
    deactivateBusinessExpense: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/business-expenses/deactivate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["BusinessExpense"],
    }),
    activateBusinessExpense: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/business-expenses/activate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["BusinessExpense"],
    }),
    deleteBusinessExpense: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/business-expenses/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusinessExpense"],
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
