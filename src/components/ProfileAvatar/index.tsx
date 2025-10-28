import { useRef, useState } from "react";
import styles from "./ProfileAvatar.module.css";
import { ContextMenu, type ContextMenuItem } from "../ui/ContextMenu";
import { LogoutIcon, SettingsIcon } from "../../assets/icons";
import { ROLE_LABELS } from "../../common/types";
import { useModal } from "../../common/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../Users/UserAvatar";
import { useGetUserMeQuery } from "../../api/usersApi";

export const ProfileAvatar = () => {
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(false);

  const navigate = useNavigate();

  const { openModal, closeModal } = useModal();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <SettingsIcon />,
      label: "Настройки профиля",
      color: "default",
      onClick: () => navigate("/settings/my-profile"),
    },
    {
      id: "delete",
      icon: <LogoutIcon />,
      label: "Выйти",
      color: "red",
      onClick: () => {
        const modalId = openModal({
          title: "Подтвердите выход",
          description: "Вы действительно хотите выйти?",
          primaryButton: {
            text: "Выйти",
            onClick: () => {
              closeModal(modalId);
              navigate("/logout");
            },
          },
          secondaryButton: {
            text: "Отмена",
            onClick: () => closeModal(modalId),
          },
        });
      },
    },
  ];

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setIsProfileOptionsOpen((prev) => !prev);
  };

  const { data: user } = useGetUserMeQuery();

  if (user)
    return (
      <div className={styles.profileContainer}>
        <div
          role="button"
          aria-label="profile-options"
          className={styles.profileAvatar}
          ref={buttonRef}
          onClick={handleOptions}
        >
          <UserAvatar user={user} />
          <div className={styles.settingsIcon}>
            <SettingsIcon />
          </div>
        </div>
        <div className={styles.profileName}>
          <p className="text_medium_bold">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text_small">{ROLE_LABELS[user.role]}</p>
        </div>
        <ContextMenu
          anchorRef={buttonRef}
          items={items}
          open={isProfileOptionsOpen}
          onClose={() => setIsProfileOptionsOpen(false)}
        />
      </div>
    );

  return null;
};
