import { ApiResponse, CreateRequest } from "@shared/api";
import { showError, showSuccess } from "@shared/lib";

export const useCreateEntity = <TCreate, TResponse>(
  mutationHook: () => readonly [
    (arg: CreateRequest<TCreate>) => {
      unwrap: () => Promise<ApiResponse<TResponse>>;
    },
    { isLoading: boolean },
  ],
) => {
  const [mutate, { isLoading }] = mutationHook();

  const createEntity = async (data: TCreate) => {
    try {
      const result = await mutate({ data }).unwrap();
      showSuccess(result.message);
      if ("data" in result) {
        return result.data;
      }

      return undefined;
    } catch (err) {
      showError(err);
      throw err;
    }
  };

  return { createEntity, isLoading };
};
