import { useCreateEntity } from "@shared/lib";

import { ProductGroup, ProductGroupCreateDto } from ".";
import { useCreateProductGroupMutation } from "../api/serviceProductGroupApi";

export const useCreateProductGroup = () => {
  const { createEntity: createProductGroup, isLoading } = useCreateEntity<
    ProductGroupCreateDto,
    ProductGroup
  >(useCreateProductGroupMutation);

  return { createProductGroup, isLoading };
};
