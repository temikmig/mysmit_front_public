import { useCreateEntity } from "@shared/lib";

import { ActionProductGroup, ProductGroup } from ".";
import { useAssignProductGroupMutation } from "../api/serviceProductGroupApi";

export const useAssignProductGroup = () => {
  const { createEntity: assignProductGroup, isLoading } = useCreateEntity<
    ActionProductGroup,
    ProductGroup
  >(useAssignProductGroupMutation);

  return { assignProductGroup, isLoading };
};
