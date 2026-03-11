import { ApiResponse, IdRequest } from "@shared/api";

import { showError, showSuccess } from "../notifications";

export const useCheckEntity = <Id>(
  mutationHook: () => readonly [
    (id: IdRequest<Id>) => { unwrap: () => Promise<ApiResponse> },
    { isLoading: boolean },
  ],
  showMessage = true,
) => {
  const [mutate, { isLoading }] = mutationHook();

  const checkEntity = async (id: Id) => {
    try {
      const result = await mutate(id).unwrap();
      if (showMessage) showSuccess(result.message);
    } catch (err) {
      showError(err);
      throw err;
    }
  };

  return { checkEntity, isLoading };
};
