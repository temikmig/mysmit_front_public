import {
  ClientSourceCreateDto,
  ClientSourceSearchOption,
  useCreateClientSourceMutation,
} from "@entities/clientSource";
import { useCreateEntity } from "@shared/lib";

export const useCreateClientSource = () => {
  const { createEntity: createClientSource, isLoading } = useCreateEntity<
    ClientSourceCreateDto,
    ClientSourceSearchOption
  >(useCreateClientSourceMutation);

  return { createClientSource, isLoading };
};
