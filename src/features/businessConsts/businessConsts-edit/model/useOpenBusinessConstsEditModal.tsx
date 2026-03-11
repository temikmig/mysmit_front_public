import { useModal } from "@app/providers";

import { BusinessConstsEditModal } from "../ui";

export const useOpenBusinessConstsEditModal = () => {
  const { openModal } = useModal();

  return () =>
    openModal({
      title: "Постоянные",
      width: 400,
      content: <BusinessConstsEditModal />,
    });
};
