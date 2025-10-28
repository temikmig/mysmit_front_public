import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export interface StockMovement {
  id: number;
  productId: number;
  quantity: number;
  comment?: string;
  writeoffPrice: number;
  reserveValue: number;
  createdAt: string;
}

export interface WriteOffArgs {
  productId: number;
  quantity?: number | null;
  resourceQuantity?: number | null;
  comment?: string | null;
}

export const writeOffApi = createApi({
  reducerPath: "writeOffApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["writeOff", "Product"],
  endpoints: (build) => ({
    createWriteOff: build.mutation<StockMovement, WriteOffArgs>({
      query: ({ productId, quantity, resourceQuantity, comment }) => ({
        url: "/write-off/manual",
        method: "POST",
        body: {
          productId,
          quantity,
          resourceQuantity,
          comment,
        },
      }),
      invalidatesTags: ["writeOff", "Product"],
    }),
  }),
});

export const { useCreateWriteOffMutation } = writeOffApi;
