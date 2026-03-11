import { useNavigate, useLocation } from "react-router-dom";

import { ROUTES } from "@app/constants";
import { useModal } from "@app/providers";

import { UserProfileModal } from "../ui";

export const useOpenUserProfileModal = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    userId?: string,
    pushUrl: boolean = false,
    basePath?: string,
    url?: string,
  ) => {
    if (!userId) return;

    const navUrl = pushUrl ? `${ROUTES.USERS}/${userId}` : url || undefined;

    openModal({
      title: "Профиль",
      isCloseOverlay: false,
      content: <UserProfileModal userId={userId} />,
      url: navUrl,
      basePath: basePath || ROUTES.USERS,
    });

    if (pushUrl && navUrl && location.pathname !== navUrl) {
      navigate(navUrl, {
        replace: false,
        state: { modal: true, basePath: basePath || ROUTES.USERS },
      });
    }
  };
};
