import { UpdateRequest, ApiResponse } from "@shared/api";

import { showError, showSuccess } from "../notifications";

export const useEditEntity = <TEdit, TResponse, Id = string>(
  mutationHook: () => readonly [
    (arg: UpdateRequest<TEdit, Id>) => {
      unwrap: () => Promise<ApiResponse<TResponse>>;
    },
    { isLoading: boolean },
  ],
) => {
  const [mutate, { isLoading }] = mutationHook();

  const editEntity = async (id: Id, data: TEdit) => {
    try {
      const result = await mutate({ id, data }).unwrap();
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

  return { editEntity, isLoading };
};
