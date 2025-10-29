import { baseApi } from "./baseApi";
import { MonthlyPlan, PiggyBank, PlanData } from "../common/types";

export const plansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMonthlyPlan: builder.query<MonthlyPlan, PlanData>({
      query: ({ year, month }) => `/plans/plan/${year}/${month}`,
      providesTags: ["Global"],
    }),
    getActiveMonthlyPlan: builder.query<MonthlyPlan | null, void>({
      query: () => `/plans/active`,
      providesTags: ["Global"],
    }),
    openMonthPlan: builder.mutation<void, PlanData>({
      query: ({ year, month }) => ({
        url: `/plans/open/${year}/${month}`,
        method: "POST",
      }),
      invalidatesTags: ["Global"],
    }),
    closeMonthPlan: builder.mutation<void, PlanData>({
      query: ({ year, month }) => ({
        url: `/plans/close/${year}/${month}`,
        method: "POST",
      }),
      invalidatesTags: ["Global"],
    }),
    getPiggyBank: builder.query<PiggyBank, string>({
      query: (id) => `/plans/piggy-bank/${id}`,
      providesTags: ["Global"],
    }),
    addPiggyBank: builder.mutation<
      PiggyBank,
      { name: string; plannedAmount: number }
    >({
      query: (body) => ({ url: "/plans/piggy-bank/add", method: "POST", body }),
      invalidatesTags: ["Global"],
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
      invalidatesTags: ["Global"],
    }),
    deletePiggyBank: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/plans/piggy-bank/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
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
