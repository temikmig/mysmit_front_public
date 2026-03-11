import { ROUTES } from "@app/constants";
import { useOpenEntityModal } from "@shared/lib";

import { ClientCardModal } from "../ui";

export const useOpenClientCardModal = () => {
  const open = useOpenEntityModal();

  return (clientId?: string, pushUrl = false) => {
    if (!clientId) return;

    open(
      <ClientCardModal clientId={clientId} />,
      "Клиент",
      clientId,
      ROUTES.DIRECTORY.CLIENTS,
      pushUrl,
    );
  };
};
