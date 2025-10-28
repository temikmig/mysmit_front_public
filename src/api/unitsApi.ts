import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { Unit } from "../common/types";

export const unitsApi = createApi({
  reducerPath: "unitsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Unit"],
  endpoints: (builder) => ({
    getUnits: builder.query<Unit[], void>({
      query: () => "/units",
      providesTags: ["Unit"],
    }),
    createUnit: builder.mutation<Unit, { name: string; shortName: string }>({
      query: (body) => ({ url: "/units/create", method: "POST", body }),
      invalidatesTags: ["Unit"],
    }),
  }),
});

export const { useGetUnitsQuery, useCreateUnitMutation } = unitsApi;
