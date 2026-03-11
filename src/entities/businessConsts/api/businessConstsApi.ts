import { ApiResponse, baseApi, CreateRequest } from "@shared/api";

import { BusinessConsts, BusinessConstsCreateDto } from "../model/types";

export const businessConstsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessConsts: builder.query<BusinessConsts, void>({
      query: () => "/business-consts",
      providesTags: ["Global"],
    }),
    editBusinessConsts: builder.mutation<
      ApiResponse<BusinessConsts>,
      CreateRequest<BusinessConstsCreateDto>
    >({
      query: ({ data }) => ({
        url: "/business-consts/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const { useGetBusinessConstsQuery, useEditBusinessConstsMutation } =
  businessConstsApi;
