import { baseApi } from "./baseApi";
import { StockMovementWriteOff, WriteOffArgs } from "../common/types";

export const writeOffApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createWriteOff: build.mutation<StockMovementWriteOff, WriteOffArgs>({
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
      invalidatesTags: ["Global"],
    }),
  }),
});

export const { useCreateWriteOffMutation } = writeOffApi;
