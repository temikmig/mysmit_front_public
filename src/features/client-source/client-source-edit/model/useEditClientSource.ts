import {
  ClientSourceEditDto,
  ClientSource,
  useEditClientSourceMutation,
} from "@entities/clientSource";
import { useEditEntity } from "@shared/lib";

export const useEditClientSource = () => {
  const { editEntity: editClientSource, isLoading } = useEditEntity<
    ClientSourceEditDto,
    ClientSource,
    string
  >(useEditClientSourceMutation);

  return { editClientSource, isLoading };
};
