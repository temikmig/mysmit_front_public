import {
  ApiResponse,
  baseApi,
  CreateRequest,
  DeleteRequest,
  IdRequest,
  PaginatedQueryParams,
  PaginatedResponse,
  SearchRequest,
  UpdateRequest,
} from "@shared/api";
import { buildQueryParams } from "@shared/lib";

import {
  Checklist,
  ChecklistAllStats,
  ChecklistCreateDto,
  ChecklistEditDto,
  ChecklistListItem,
  ChecklistRejectDto,
  ChecklistReportItem,
  ChecklistServiceData,
  ChecklistServiceProduct,
  ChecklistsReportList,
} from "../model";

export const checklistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // получить чек-лист
    getChecklist: builder.query<Checklist, string>({
      query: (id) => `/checklists/${id}`,
      providesTags: ["Global"],
    }),

    // таблица чек-листов
    getChecklistsList: builder.query<
      PaginatedResponse<ChecklistListItem>,
      PaginatedQueryParams<ChecklistListItem>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
          filters: params.filters,
        });

        return `/checklists/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // создать чек-лист
    createChecklist: builder.mutation<
      ApiResponse<Checklist>,
      CreateRequest<ChecklistCreateDto>
    >({
      query: ({ data }) => ({
        url: "/checklists/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // редактировать чек-лист
    editChecklist: builder.mutation<
      ApiResponse<Checklist>,
      UpdateRequest<ChecklistEditDto>
    >({
      query: ({ id, data }) => ({
        url: `/checklists/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // удалить чек-лист
    deleteChecklist: builder.mutation<ApiResponse, DeleteRequest>({
      query: (id) => ({ url: `/checklists/delete/${id}`, method: "DELETE" }),
      invalidatesTags: ["Global"],
    }),

    // подтвердить чек-лист
    approveChecklist: builder.mutation<ApiResponse<Checklist>, IdRequest>({
      query: (id) => ({
        url: `/checklists/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Global"],
    }),

    // отклонить чек-лист
    rejectChecklist: builder.mutation<
      ApiResponse<Checklist>,
      UpdateRequest<ChecklistRejectDto>
    >({
      query: ({ id, data }) => ({
        url: `/checklists/reject/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    getChecklistServiceData: builder.query<
      ApiResponse<ChecklistServiceData>,
      IdRequest<number>
    >({
      query: (id) => `/checklists/service-data/${id}`,
      providesTags: ["Global"],
    }),

    getChecklistProductsByIds: builder.query<
      ApiResponse<ChecklistServiceProduct[]>,
      number[]
    >({
      query: (ids) => ({
        url: "/checklists/products-by-ids",
        method: "POST",
        body: { ids },
      }),
    }),

    getChecklistProductsSearch: builder.query<
      ChecklistServiceProduct[],
      SearchRequest & { serviceId: number }
    >({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/checklists/products-search?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    getChecklistsStats: builder.query<ChecklistAllStats, { month: string }>({
      query: ({ month }) => `/checklists/stats/${month}`,
      providesTags: ["Global"],
    }),

    getChecklistsReport: builder.query<
      ChecklistsReportList,
      PaginatedQueryParams<ChecklistReportItem>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
          filters: params.filters,
        });

        return `/checklists/list-report?${queryString}`;
      },
      providesTags: ["Global"],
    }),
  }),
});

export const {
  useGetChecklistQuery,
  useGetChecklistsListQuery,
  useGetChecklistsReportQuery,
  useCreateChecklistMutation,
  useEditChecklistMutation,
  useDeleteChecklistMutation,
  useApproveChecklistMutation,
  useRejectChecklistMutation,
  useGetChecklistServiceDataQuery,
  useGetChecklistProductsByIdsQuery,
  useGetChecklistProductsSearchQuery,
  useGetChecklistsStatsQuery,
} = checklistApi;
