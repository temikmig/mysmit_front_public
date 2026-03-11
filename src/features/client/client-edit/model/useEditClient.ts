import { Client, ClientEditDto, useEditClientMutation } from "@entities/client";
import { useEditEntity } from "@shared/lib";

export const useEditClient = () => {
  const { editEntity: editClient, isLoading } = useEditEntity<
    ClientEditDto,
    Client,
    string
  >(useEditClientMutation);

  return { editClient, isLoading };
};
