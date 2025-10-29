import { baseApi } from "./baseApi";
import type {
  Checklist,
  ChecklistListArgs,
  ChecklistMonth,
  ChecklistStats,
  CreateChecklistArgs,
} from "../common/types";

export const checklistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChecklist: builder.query<Checklist, string>({
      query: (id) => `/checklists/${id}`,
      providesTags: ["Global"],
    }),
    getChecklistStats: builder.query<
      ChecklistStats,
      { dateFrom?: string; dateTo?: string; serviceId?: number }
    >({
      query: ({ dateFrom, dateTo, serviceId }) => ({
        url: `/checklists/stats`,
        params: { dateFrom, dateTo, serviceId },
      }),
      providesTags: ["Global"],
    }),
    getChecklistsList: builder.query<
      { checklists: Checklist[]; total: number },
      ChecklistListArgs
    >({
      query: ({ page = 1, limit = 10, search, sortColumn, sortOrder }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (search) params.append("search", search);
        if (sortColumn) params.append("sortColumn", String(sortColumn));
        if (sortOrder) params.append("sortOrder", sortOrder);
        return `/checklists/list?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    getChecklistsListMonth: builder.query<
      ChecklistMonth,
      ChecklistListArgs & { month: number; year: number }
    >({
      query: ({
        page = 1,
        limit = 10,
        search,
        sortColumn,
        sortOrder,
        month,
        year,
      }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        params.append("month", String(month));
        params.append("year", String(year));
        if (search) params.append("search", search);
        if (sortColumn) params.append("sortColumn", String(sortColumn));
        if (sortOrder) params.append("sortOrder", sortOrder);
        return `/checklists/list-month?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    createChecklist: builder.mutation<Checklist, CreateChecklistArgs>({
      query: (body) => ({
        url: "/checklists/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
    }),
    confirmChecklist: builder.mutation<Checklist, string>({
      query: (id) => ({
        url: `/checklists/confirm/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Global"],
    }),
    invalidChecklist: builder.mutation<
      void,
      { id: string; data: { comment: string } }
    >({
      query: ({ id, data }) => ({
        url: `/checklists/invalid/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetChecklistsListQuery,
  useGetChecklistsListMonthQuery,
  useGetChecklistQuery,
  useGetChecklistStatsQuery,
  useCreateChecklistMutation,
  useConfirmChecklistMutation,
  useInvalidChecklistMutation,
} = checklistsApi;
