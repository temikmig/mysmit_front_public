import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./baseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Global",
    "Service",
    "ProductGroups",
    "EmployeeSalaryMovements",
    "Notifications",
  ],
  endpoints: () => ({}),
});
