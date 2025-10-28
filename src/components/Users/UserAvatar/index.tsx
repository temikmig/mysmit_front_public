import type { User } from "../../../common/types";
import styles from "./UserAvata.module.css";

interface UserAvatarProps {
  user: User;
  size?: number;
}

const COLORS = ["#4E7EA8", "#69E16D", "#E39D6E", "#F56767"];

function getColorFromUUID(uuid: string): string {
  let sum = 0;
  for (let i = 0; i < uuid.length; i++) {
    sum += uuid.charCodeAt(i);
  }
  return COLORS[sum % COLORS.length];
}

export const UserAvatar = ({ user, size = 48 }: UserAvatarProps) => {
  const initials = `${user.firstName?.[0] ?? ""}${
    user.lastName?.[0] ?? ""
  }`.toUpperCase();

  if (user.userAvatar)
    return (
      <img
        src={user.userAvatar}
        className={styles.userAvatarCont}
        alt="userAvatar"
      />
    );

  const bgColor = getColorFromUUID(user.id);

  return (
    <div
      className={styles.userAvatarCont}
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        fontSize: size / 3,
      }}
    >
      {initials}
    </div>
  );
};
