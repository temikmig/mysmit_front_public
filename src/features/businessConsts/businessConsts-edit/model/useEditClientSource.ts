import {
  BusinessConsts,
  BusinessConstsCreateDto,
  useEditBusinessConstsMutation,
} from "@entities/businessConsts";
import { useCreateEntity } from "@shared/lib";

export const useEditBusinessConsts = () => {
  const { createEntity: editBusinessConsts, isLoading } = useCreateEntity<
    BusinessConstsCreateDto,
    BusinessConsts
  >(useEditBusinessConstsMutation);

  return { editBusinessConsts, isLoading };
};
