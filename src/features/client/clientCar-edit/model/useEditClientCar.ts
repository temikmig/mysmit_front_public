import {
  Car,
  ClientCarEditDto,
  useEditClientCarMutation,
} from "@entities/client";
import { useEditEntity } from "@shared/lib";

export const useEditClientCar = () => {
  const { editEntity: editClientCar, isLoading } = useEditEntity<
    ClientCarEditDto,
    Car,
    string
  >(useEditClientCarMutation);

  return { editClientCar, isLoading };
};
