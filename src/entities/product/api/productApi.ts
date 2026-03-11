import {
  ApiResponse,
  baseApi,
  CreateRequest,
  DeleteRequest,
  PaginatedQueryParams,
  PaginatedResponse,
  UpdateRequest,
} from "@shared/api";
import { buildQueryParams } from "@shared/lib";

import {
  Product,
  ProductCreateDto,
  ProductEditDto,
  ProductListItem,
  ProductUnitStorage,
  ProductWriteOffPrice,
  ProductWriteOffPriceEditDto,
} from "../model";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // получить товар
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Global"],
    }),

    getProductUnitsStorage: builder.query<ProductUnitStorage[], void>({
      query: () => "/units",
      providesTags: ["Global"],
    }),

    // таблица товаров
    getProductsList: builder.query<
      PaginatedResponse<ProductListItem>,
      PaginatedQueryParams<ProductListItem>
    >({
      query: (params) => {
        const queryString = buildQueryParams({
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search,
          sortColumn: params.sortColumn,
          sortOrder: params.sortOrder,
          filters: params.filters,
        });

        return `/products/list?${queryString}`;
      },
      providesTags: ["Global"],
    }),

    // создать товар
    createProduct: builder.mutation<
      ApiResponse<Product>,
      CreateRequest<ProductCreateDto>
    >({
      query: ({ data }) => ({
        url: "/products/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // редактировато товар
    editProduct: builder.mutation<
      ApiResponse<Product>,
      UpdateRequest<ProductEditDto, number>
    >({
      query: ({ id, data }) => ({
        url: `/products/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // удалить товар
    deleteProduct: builder.mutation<ApiResponse, DeleteRequest<number>>({
      query: (id) => ({ url: `/products/delete/${id}`, method: "DELETE" }),
      invalidatesTags: ["Global"],
    }),

    // редактировать цену списания товара
    editProductWriteOffPrice: builder.mutation<
      ApiResponse<ProductWriteOffPrice>,
      UpdateRequest<ProductWriteOffPriceEditDto, number>
    >({
      query: ({ id, data }) => ({
        url: `/products/edit-writeoff/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Global"],
    }),

    // getProductsList: builder.query<
    //   { products: Product[]; total: number },
    //   {
    //     page?: number;
    //     limit?: number;
    //     search?: string;
    //     sortColumn?: keyof Product;
    //     sortOrder?: "asc" | "desc";
    //     visibility?: "active" | "hidden" | "all";
    //     stock?: "positive" | "empty" | "all";
    //     productType?: "ALL" | ProductType;
    //   }
    // >({
    //   query: ({
    //     page = 1,
    //     limit = 10,
    //     search,
    //     sortColumn,
    //     sortOrder,
    //     visibility,
    //     stock,
    //     productType,
    //   }) => {
    //     const params = new URLSearchParams();
    //     params.append("page", String(page));
    //     params.append("limit", String(limit));
    //     if (search) params.append("search", search);
    //     if (sortColumn) params.append("sortColumn", String(sortColumn));
    //     if (sortOrder) params.append("sortOrder", sortOrder);
    //     if (visibility) params.append("visibility", visibility);
    //     if (stock) params.append("stock", stock);
    //     if (productType) params.append("productType", productType);
    //     return `/products/list?${params.toString()}`;
    //   },
    //   providesTags: ["Global"],
    // }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductUnitsStorageQuery,
  useGetProductsListQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useEditProductWriteOffPriceMutation,
} = productApi;
