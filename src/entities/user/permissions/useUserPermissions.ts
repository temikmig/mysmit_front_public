import { useAuth } from "@features/auth";

import { User } from "../model";
import * as rules from "./rules";

export const useUserPermissions = (targetUser: User) => {
  const { user: currentUser } = useAuth();

  if (!currentUser) {
    return { canEdit: false, canDelete: false, canChangePassword: false };
  }

  return {
    canEdit: rules.canEditUser(currentUser, targetUser),
    canDelete: rules.canDeleteUser(currentUser, targetUser),
    canChangeRole: rules.canChangeRole(currentUser, targetUser),
    canChangePassword: rules.canChangePassword(currentUser, targetUser),
  };
};
