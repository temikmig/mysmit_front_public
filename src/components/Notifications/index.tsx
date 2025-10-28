import { useRef, useState } from "react";
import { InfoIcon, NotificationsIcon } from "../../assets/icons";
import styles from "./Notifications.module.css";
import { Dropdown } from "../ui/Dropdown";

export const Notifications = () => {
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);

  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        className={styles.notificationsCont}
        onClick={() => setIsOpenNotifications((prev) => !prev)}
        ref={anchorRef}
      >
        <NotificationsIcon />
        {}
        {/* <div className={styles.noticeFlag} /> */}
      </button>
      <Dropdown
        anchorRef={anchorRef}
        open={isOpenNotifications}
        onClose={() => setIsOpenNotifications(false)}
        withShadow
        placement="bottom end"
        offsetY={8}
      >
        <div className={styles.notificationsContainer}>
          <InfoIcon fontSize={24} />
          Новых уведомлений нет
        </div>
      </Dropdown>
    </>
  );
};
