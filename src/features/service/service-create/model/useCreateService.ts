import {
  ServiceCreateDto,
  ServiceSearchOption,
  useCreateServiceMutation,
} from "@entities/service";
import { useCreateEntity } from "@shared/lib";

export const useCreateService = () => {
  const { createEntity: createService, isLoading } = useCreateEntity<
    ServiceCreateDto,
    ServiceSearchOption
  >(useCreateServiceMutation);

  return { createService, isLoading };
};
