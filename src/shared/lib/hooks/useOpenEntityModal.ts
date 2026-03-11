import { JSX } from "react";

import { useModal } from "@app/providers";

export const useOpenEntityModal = () => {
  const { openModal } = useModal();

  return (
    content: JSX.Element,
    title: string,
    id: string | number,
    baseRoute?: string,
    pushUrl: boolean = false,
    width?: number,
    fullsizeButton?: boolean,
  ) => {
    const navUrl = `${baseRoute}/${id}`;

    openModal({
      title,
      isCloseOverlay: false,
      content,
      url: navUrl,
      pushUrl,
      basePath: baseRoute,
      width: width ?? 600,
      fullsizeButton,
    });
  };
};
