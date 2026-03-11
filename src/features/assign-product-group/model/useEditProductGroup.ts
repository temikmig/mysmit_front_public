import { useEditEntity } from "@shared/lib";

import { ProductGroup, ProductGroupEditDto } from ".";
import { useEditProductGroupMutation } from "../api/serviceProductGroupApi";

export const useEditProductGroup = () => {
  const { editEntity: editProductGroup, isLoading } = useEditEntity<
    ProductGroupEditDto,
    ProductGroup,
    number
  >(useEditProductGroupMutation);

  return { editProductGroup, isLoading };
};
