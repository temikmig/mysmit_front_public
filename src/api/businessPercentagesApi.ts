import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { BusinessPercentages } from "../common/types";

export const businessPercentagesApi = createApi({
  reducerPath: "businessPercentagesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["BusinessPercentages"],
  endpoints: (builder) => ({
    getBusinessPercentages: builder.query<BusinessPercentages | null, void>({
      query: () => "/business-percentages",
      providesTags: ["BusinessPercentages"],
    }),
    addBusinessPercentages: builder.mutation<
      BusinessPercentages,
      Partial<BusinessPercentages>
    >({
      query: (body) => ({
        url: "/business-percentages/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BusinessPercentages"],
    }),
  }),
});

export const {
  useGetBusinessPercentagesQuery,
  useAddBusinessPercentagesMutation,
} = businessPercentagesApi;
