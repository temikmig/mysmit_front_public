import { ROUTES } from "@app/constants";
import { useOpenEntityModal } from "@shared/lib";

import { ClientSourceCardModal } from "../ui";

export const useOpenClientSourceCardModal = () => {
  const open = useOpenEntityModal();

  return (clientSourceId?: string, pushUrl = false) => {
    if (!clientSourceId) return;

    open(
      <ClientSourceCardModal clientSourceId={clientSourceId} />,
      "Источник клиента",
      clientSourceId,
      ROUTES.DIRECTORY.CLIENT_SOURCES,
      pushUrl,
    );
  };
};
