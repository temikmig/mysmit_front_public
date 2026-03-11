import {
  ClientCreateDto,
  useCreateClientMutation,
  ClientSearchOption,
} from "@entities/client";
import { useCreateEntity } from "@shared/lib";

export const useCreateClient = () => {
  const { createEntity: createClient, isLoading } = useCreateEntity<
    ClientCreateDto,
    ClientSearchOption
  >(useCreateClientMutation);

  return { createClient, isLoading };
};
