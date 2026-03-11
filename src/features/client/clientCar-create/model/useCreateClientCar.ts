import {
  ClientCarCreateDto,
  ClientCarSearchOption,
  useCreateClientCarMutation,
} from "@entities/client";
import { useCreateEntity } from "@shared/lib";

export const useCreateClientCar = () => {
  const { createEntity: createClientCar, isLoading } = useCreateEntity<
    ClientCarCreateDto,
    ClientCarSearchOption
  >(useCreateClientCarMutation);

  return { createClientCar, isLoading };
};
