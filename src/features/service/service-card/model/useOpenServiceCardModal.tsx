import { ROUTES } from "@app/constants";
import { useOpenEntityModal } from "@shared/lib";

import { ServiceCardModal } from "../ui";

export const useOpenServiceCardModal = () => {
  const open = useOpenEntityModal();

  return (serviceId?: number, pushUrl = false) => {
    if (!serviceId) return;

    open(
      <ServiceCardModal serviceId={serviceId} />,
      "Услуга",
      serviceId,
      ROUTES.DIRECTORY.SERVICES,
      pushUrl,
    );
  };
};
