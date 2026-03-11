import { baseApi, SearchRequest } from "@shared/api";
import { buildQueryParams } from "@shared/lib";

import { MoneySourceSearchOption } from "../model";

export const moneySourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //получить источник финансов
    getMoneySourcesSearch: builder.query<
      MoneySourceSearchOption[],
      SearchRequest
    >({
      query: (params) => {
        const queryString = buildQueryParams(params);
        return `/finances/sources?${queryString}`;
      },
      providesTags: ["Global"],
    }),
  }),
});

export const { useGetMoneySourcesSearchQuery } = moneySourceApi;
