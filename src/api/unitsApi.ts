import { baseApi } from "./baseApi";
import type { Unit } from "../common/types";

export const unitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query<Unit[], void>({
      query: () => "/units",
      providesTags: ["Global"],
    }),
    createUnit: builder.mutation<Unit, { name: string; shortName: string }>({
      query: (body) => ({ url: "/units/create", method: "POST", body }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const { useGetUnitsQuery, useCreateUnitMutation } = unitsApi;
