import { User, UserRoleEnum } from "../model";

export const canEditUser = (currentUser: User, targetUser: User) => {
  return (
    currentUser.role === UserRoleEnum.ADMIN || currentUser.id === targetUser.id
  );
};

export const canDeleteUser = (currentUser: User, targetUser: User) => {
  return (
    currentUser.role === UserRoleEnum.ADMIN &&
    targetUser.role !== UserRoleEnum.ADMIN
  );
};

export const canChangeRole = (currentUser: User, targetUser: User) => {
  return (
    currentUser.role === UserRoleEnum.ADMIN &&
    targetUser.role !== UserRoleEnum.ADMIN
  );
};

export const canChangePassword = (currentUser: User, targetUser: User) => {
  return (
    currentUser.role === UserRoleEnum.ADMIN || currentUser.id === targetUser.id
  );
};
