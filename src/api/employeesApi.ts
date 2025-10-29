import { baseApi } from "./baseApi";
import { Employee } from "../common/types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployee: builder.query<Employee, string>({
      query: (id) => `/employees/${id}`,
      providesTags: ["Global"],
    }),
    getEmployeesList: builder.query<
      { employees: Employee[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof Employee;
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
        return `/employees/list?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    getEmployeesSearch: builder.query<
      Employee[],
      { search?: string; limit?: number }
    >({
      query: ({ search, limit }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/employees/search?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    addEmployee: builder.mutation<
      Employee,
      { firstName: string; lastName: string }
    >({
      query: (body) => ({ url: "/employees/add", method: "POST", body }),
      invalidatesTags: ["Global"],
    }),
    editEmployee: builder.mutation<
      Employee,
      { id: string; data: Partial<Employee> }
    >({
      query: ({ id, data }) => ({
        url: `/employees/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    deleteEmployee: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/employees/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
    transferEmployeeSalaryReserve: builder.mutation<
      { success: boolean; message: string },
      {
        fromEmployeeId: string;
        toEmployeeId?: string;
        transferMode: "INCRACE" | "DECRACE" | "TRANSFER";
        amount: number;
        comment?: string;
      }
    >({
      query: (body) => ({
        url: `/employees/transfer-salary-reserve`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
    }),
    transferEmployeeSalary: builder.mutation<
      { success: boolean; message: string },
      {
        employeeId: string;
        amount: number;
        comment?: string;
      }
    >({
      query: (body) => ({
        url: `/employees/transfer-salary`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useLazyGetEmployeeQuery,
  useGetEmployeesListQuery,
  useGetEmployeesSearchQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,
  useTransferEmployeeSalaryReserveMutation,
  useTransferEmployeeSalaryMutation,
} = employeesApi;
