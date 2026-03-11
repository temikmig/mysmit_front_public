import {
  Service,
  ServiceEditDto,
  useEditServiceMutation,
} from "@entities/service";
import { useEditEntity } from "@shared/lib";

export const useEditService = () => {
  const { editEntity: editService, isLoading } = useEditEntity<
    ServiceEditDto,
    Service,
    number
  >(useEditServiceMutation);

  return { editService, isLoading };
};
