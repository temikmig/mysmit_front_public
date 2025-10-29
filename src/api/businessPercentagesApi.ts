import { baseApi } from "./baseApi";
import { BusinessPercentages } from "../common/types";

export const businessPercentagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessPercentages: builder.query<BusinessPercentages | null, void>({
      query: () => "/business-percentages",
      providesTags: ["Global"],
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
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetBusinessPercentagesQuery,
  useAddBusinessPercentagesMutation,
} = businessPercentagesApi;
