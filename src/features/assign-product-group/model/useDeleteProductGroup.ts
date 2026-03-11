import { useDeleteEntity } from "@shared/lib";

import { useDeleteProductGroupMutation } from "../api/serviceProductGroupApi";

export const useDeleteProductGroup = () => {
  const { deleteEntity: deleteProductGroup, isLoading } =
    useDeleteEntity<number>(useDeleteProductGroupMutation);

  return { deleteProductGroup, isLoading };
};
