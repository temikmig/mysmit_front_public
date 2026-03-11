import {
  ApiResponse,
  baseApi,
  CreateRequest,
  DeleteRequest,
  UpdateRequest,
} from "@shared/api";

import {
  ActionProductGroup,
  ProductGroup,
  ProductGroupCreateDto,
  ProductGroupEditDto,
} from "../model";

export const serviceProductGroupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductGroup: builder.query<ProductGroup, number>({
      query: (id) => `services/group/${id}`,
      providesTags: ["ProductGroups"],
    }),
    getProductGroupsByService: builder.query<ProductGroup[], number>({
      query: (serviceId) => `services/${serviceId}/groups`,
      providesTags: ["ProductGroups"],
    }),
    assignProductGroup: builder.mutation<
      ApiResponse<ProductGroup>,
      CreateRequest<ActionProductGroup>
    >({
      query: ({ data }) => ({
        url: `services/assign-group`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    createProductGroup: builder.mutation<
      ApiResponse<ProductGroup>,
      CreateRequest<ProductGroupCreateDto>
    >({
      query: ({ data }) => ({
        url: `services/create-group`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductGroups"],
    }),
    editProductGroup: builder.mutation<
      ApiResponse<ProductGroup>,
      UpdateRequest<ProductGroupEditDto, number>
    >({
      query: ({ id, data }) => ({
        url: `services/edit-group/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),
    deleteProductGroup: builder.mutation<ApiResponse, DeleteRequest<number>>({
      query: (id) => ({
        url: `services/delete-group/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Global", "ProductGroups"],
    }),
  }),
});

export const {
  useGetProductGroupQuery,
  useCreateProductGroupMutation,
  useGetProductGroupsByServiceQuery,
  useAssignProductGroupMutation,
  useEditProductGroupMutation,
  useDeleteProductGroupMutation,
} = serviceProductGroupApi;
