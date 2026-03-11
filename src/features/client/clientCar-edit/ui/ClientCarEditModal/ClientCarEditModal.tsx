import { FC } from "react";

import { useClientCar } from "@entities/client";
import { Loader } from "@shared/ui";

import { ClientCarEditForm } from "../ClientCarEditForm";

interface ClientCarEditModalProps {
  clientCarId: string;
  closeModal?: () => void;
}

export const ClientCarEditModal: FC<ClientCarEditModalProps> = ({
  clientCarId,
  closeModal,
}) => {
  const { clientCar, isLoading } = useClientCar(clientCarId);

  if (isLoading || !clientCar) return <Loader />;

  return <ClientCarEditForm clientCar={clientCar} onClose={closeModal} />;
};
