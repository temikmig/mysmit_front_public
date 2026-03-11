import { DeleteRequest, ApiResponse } from "@shared/api";

import { showError, showSuccess } from "../notifications";

export const useDeleteEntity = <Id>(
  mutationHook: () => readonly [
    (id: DeleteRequest<Id>) => { unwrap: () => Promise<ApiResponse> },
    { isLoading: boolean },
  ],
  showMessage = true,
) => {
  const [mutate, { isLoading }] = mutationHook();

  const deleteEntity = async (id: Id) => {
    try {
      const result = await mutate(id).unwrap();
      if (showMessage) showSuccess(result.message);
    } catch (err) {
      showError(err);
      throw err;
    }
  };

  return { deleteEntity, isLoading };
};
