import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { MonthlyPlan, PiggyBank, PlanData } from "../common/types";

export const plansApi = createApi({
  reducerPath: "plansApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Plans"],
  endpoints: (builder) => ({
    getMonthlyPlan: builder.query<MonthlyPlan, PlanData>({
      query: ({ year, month }) => `/plans/plan/${year}/${month}`,
      providesTags: ["Plans"],
    }),
    getActiveMonthlyPlan: builder.query<MonthlyPlan | null, void>({
      query: () => `/plans/active`,
      providesTags: ["Plans"],
    }),
    openMonthPlan: builder.mutation<void, PlanData>({
      query: ({ year, month }) => ({
        url: `/plans/open/${year}/${month}`,
        method: "POST",
      }),
      invalidatesTags: ["Plans"],
    }),
    closeMonthPlan: builder.mutation<void, PlanData>({
      query: ({ year, month }) => ({
        url: `/plans/close/${year}/${month}`,
        method: "POST",
      }),
      invalidatesTags: ["Plans"],
    }),
    getPiggyBank: builder.query<PiggyBank, string>({
      query: (id) => `/plans/piggy-bank/${id}`,
      providesTags: ["Plans"],
    }),
    addPiggyBank: builder.mutation<
      PiggyBank,
      { name: string; plannedAmount: number }
    >({
      query: (body) => ({ url: "/plans/piggy-bank/add", method: "POST", body }),
      invalidatesTags: ["Plans"],
    }),
    editPiggyBank: builder.mutation<
      PiggyBank,
      { id: string; data: Partial<PiggyBank> }
    >({
      query: ({ id, data }) => ({
        url: `/plans/piggy-bank/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Plans"],
    }),
    deletePiggyBank: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/plans/piggy-bank/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plans"],
    }),
  }),
});

export const {
  useGetMonthlyPlanQuery,
  useLazyGetMonthlyPlanQuery,
  useGetActiveMonthlyPlanQuery,
  useLazyGetActiveMonthlyPlanQuery,
  useOpenMonthPlanMutation,
  useCloseMonthPlanMutation,
  useGetPiggyBankQuery,
  useAddPiggyBankMutation,
  useEditPiggyBankMutation,
  useDeletePiggyBankMutation,
} = plansApi;
