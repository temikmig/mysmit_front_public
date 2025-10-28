import { ROLE_LABELS, type UserRole } from "../../../common/types";
import { Tag } from "../../ui/Tag";

import styles from "./UserRoleTag.module.css";

interface UserRoleTagProps {
  role: UserRole;
  min?: boolean;
}

export const UserRoleTag = ({ role, min = false }: UserRoleTagProps) => {
  return <Tag text={ROLE_LABELS[role]} className={styles[role]} min={min} />;
};
