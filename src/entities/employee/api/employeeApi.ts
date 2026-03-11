import {
  ApiResponse,
  baseApi,
  CreateRequest,
  DeleteRequest,
  PaginatedQueryParams,
  PaginatedResponse,
  SearchRequest,
  UpdateRequest,
} from "@shared/api";
import { buildQueryParams } from "@shared/lib";

import {
  Employee,
  EmployeeCreateDto,
  EmployeeNewSalary,
  EmployeeSalaryMovement,
  EmployeeSalaryMovementCreateDto,
  EmployeeSalaryMovementEditDto,
  EmployeeSearchOption,
} from "../model";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // получить сотрудника
    getEmployee: builder.query<Employee, string>({
      query: (id) => `/employees/${id}`,
      providesTags: ["Global"],
    }),

    // таблица сотрудников
    getEmployeesList: builder.query<
      PaginatedResponse<Employee>,
      PaginatedQueryParams<Employee>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
        });

        return `/employees/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // поиск сотрудников
    getEmployeesSearch: builder.query<EmployeeSearchOption[], SearchRequest>({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/employees/search?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // добавить сотрудника
    createEmployee: builder.mutation<
      ApiResponse<EmployeeSearchOption>,
      CreateRequest<EmployeeCreateDto>
    >({
      query: ({ data }) => ({
        url: "/employees/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // редактировать сотрудника
    editEmployee: builder.mutation<
      ApiResponse<Employee>,
      UpdateRequest<EmployeeCreateDto>
    >({
      query: ({ id, data }) => ({
        url: `/employees/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // удалить сотрудника
    deleteEmployee: builder.mutation<ApiResponse, DeleteRequest>({
      query: (id) => ({
        url: `/employees/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),

    // история движений зарплаты
    // getEmployeeSalaryMovements: builder.query<
    //   PaginatedResponse<EmployeeSalaryMovement[]>,
    //   { employeeId: string; page: number; limit: number }
    // >({
    //   query: ({ employeeId, page, limit }) => ({
    //     url: `/employees/${employeeId}/salary-movements`,
    //     params: { page, limit },
    //   }),
    // }),

    getEmployeeSalaryMovement: builder.query<EmployeeSalaryMovement, string>({
      query: (id) => `/employees/salary-movements/${id}`,
      providesTags: ["Global"],
    }),

    getEmployeeSalaryMovements: builder.query<
      { data: EmployeeSalaryMovement[]; total: number },
      { employeeId: string; page: number; limit: number; reloadFlag?: number } // добавили reloadFlag
    >({
      query: ({ employeeId, page, limit }) => ({
        url: `/employees/${employeeId}/salary-movements`,
        params: { page, limit },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.employeeId}-${queryArgs.page}-${queryArgs.reloadFlag ?? 0}`;
      },

      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) {
          currentCache.data = newData.data;
        } else {
          currentCache.data.push(...newData.data);
        }
        currentCache.total = newData.total;
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.reloadFlag !== previousArg?.reloadFlag
        );
      },

      providesTags: ["Global"],
    }),

    // добавить движение зарплаты
    createEmployeeSalaryMovement: builder.mutation<
      ApiResponse<EmployeeNewSalary>,
      CreateRequest<EmployeeSalaryMovementCreateDto>
    >({
      query: ({ data }) => ({
        url: "/employees/salary-balance-add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // редактировать движение зарплаты
    editEmployeeSalaryMovement: builder.mutation<
      ApiResponse<EmployeeNewSalary>,
      UpdateRequest<EmployeeSalaryMovementEditDto>
    >({
      query: ({ id, data }) => ({
        url: `/employees/salary-balance-edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // удалить движение зарплаты
    deleteEmployeeSalaryMovement: builder.mutation<ApiResponse, DeleteRequest>({
      query: (id) => ({
        url: `/employees/salary-balance-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),

    // transferEmployeeSalaryReserve: builder.mutation<
    //   { success: boolean; message: string },
    //   {
    //     movementDate: string;
    //     fromEmployeeId: string;
    //     toEmployeeId?: string;
    //     transferMode: "INCRACE" | "DECRACE" | "TRANSFER";
    //     amount: number;
    //     comment?: string;
    //   }
    // >({
    //   query: (body) => ({
    //     url: `/employees/transfer-salary-reserve`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Global"],
    // }),
    // transferEmployeeSalary: builder.mutation<
    //   { success: boolean; message: string },
    //   TransferEmployeeSalaryInput
    // >({
    //   query: (body) => ({
    //     url: `/employees/transfer-salary`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Global"],
    // }),
    // transferEmployeeSalaryEdit: builder.mutation<
    //   { success: boolean; message: string },
    //   { id: string; data: TransferEmployeeSalaryInput }
    // >({
    //   query: ({ id, data }) => ({
    //     url: `/employees/transfer-salary-edit/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Global"],
    // }),
    // transferEmployeeSalaryDelete: builder.mutation<
    //   { success: boolean },
    //   string
    // >({
    //   query: (id) => ({
    //     url: `/employees/transfer-salary-delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Global"],
    // }),

    // getEmployeeSalaryReserveMovement: builder.query<
    //   EmployeeSalaryReserveMovement,
    //   string
    // >({
    //   query: (id) => `/employees/salary-reserve-movement/${id}`,
    //   providesTags: ["Global"],
    // }),
    // getSalaryFundEmployees: builder.query<SalaryFundEmployees, void>({
    //   query: () => `/employees/salary-fund-employees`,
    //   providesTags: ["Global"],
    // }),
  }),
});

export const {
  useGetEmployeeQuery,
  useLazyGetEmployeeQuery,
  useGetEmployeesListQuery,
  useGetEmployeesSearchQuery,
  useCreateEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeSalaryMovementQuery,
  useGetEmployeeSalaryMovementsQuery,
  useLazyGetEmployeeSalaryMovementsQuery,
  useCreateEmployeeSalaryMovementMutation,
  useEditEmployeeSalaryMovementMutation,
  useDeleteEmployeeSalaryMovementMutation,
  // useTransferEmployeeSalaryReserveMutation,
  // useTransferEmployeeSalaryMutation,
  // useTransferEmployeeSalaryEditMutation,
  // useTransferEmployeeSalaryDeleteMutation,
  // useGetEmployeeSalaryReserveMovementQuery,
  // useGetSalaryFundEmployeesQuery,
} = employeesApi;
