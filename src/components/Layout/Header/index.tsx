import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { useSelector } from "react-redux";
import { getHeaderTitle } from "../../../store/slices";
import { AngleLeftIcon } from "../../../assets/icons";
import { ProfileAvatar } from "../../ProfileAvatar";
import { Notifications } from "../../Notifications";
import styles from "./Header.module.css";
import type { RouteHandle } from "../../../components/types/routes";

export const Header = () => {
  const matches = useMatches();
  const reduxTitle = useSelector(getHeaderTitle);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dynamicMatch = [...matches]
    .reverse()
    .find((m) => (m.handle as RouteHandle)?.dynamicTitle);

  const staticMatch = [...matches]
    .reverse()
    .find((m) => typeof (m.handle as RouteHandle)?.title === "string");

  const headerTitle = dynamicMatch
    ? reduxTitle
    : staticMatch
    ? (staticMatch.handle as RouteHandle).title
    : "Дашборд";

  const handleBack = () => {
    if (pathname === "/dashboard") return;
    const parts = pathname.split("/").filter(Boolean);
    parts.pop();
    navigate(parts.length === 0 ? "/dashboard" : "/" + parts.join("/"));
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleCont}>
        {pathname !== "/dashboard" && (
          <div className={styles.backAngleCont}>
            <AngleLeftIcon onClick={handleBack} className={styles.backAngle} />
          </div>
        )}
        <h3>{headerTitle}</h3>
      </div>
      <div className={styles.profileCont}>
        <Notifications />
        <ProfileAvatar />
      </div>
    </header>
  );
};
