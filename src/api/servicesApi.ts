import { baseApi } from "./baseApi";
import type { ProductsByService, Service, ServiceInput } from "../common/types";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query<Service, number>({
      query: (id) => `/services/${id}`,
      providesTags: ["Global"],
    }),
    getProductsByService: builder.query<
      ProductsByService,
      { serviceId: number }
    >({
      query: ({ serviceId }) => `/services/${serviceId}/products-available`,
      providesTags: ["Global"],
    }),
    getServicesList: builder.query<
      { services: Service[]; total: number },
      {
        page?: number;
        limit?: number;
        search?: string;
        sortColumn?: keyof Service;
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
        return `/services/list?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    getServicesSearch: builder.query<
      Service[],
      { search?: string; limit?: number }
    >({
      query: ({ search, limit }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        return `/services/search?${params.toString()}`;
      },
      providesTags: ["Global"],
    }),
    addService: builder.mutation<Service, ServiceInput>({
      query: (body) => ({ url: "/services/add", method: "POST", body }),
      invalidatesTags: ["Global"],
    }),
    editService: builder.mutation<
      Service,
      { id: number; data: Partial<Service> }
    >({
      query: ({ id, data }) => ({
        url: `/services/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    deleteService: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/services/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Global"],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetServicesListQuery,
  useGetServicesSearchQuery,
  useGetProductsByServiceQuery,
  useLazyGetServiceQuery,
  useAddServiceMutation,
  useEditServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
