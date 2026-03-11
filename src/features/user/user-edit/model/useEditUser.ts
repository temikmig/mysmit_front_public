import { useEditUserMutation, User, UserEditDto } from "@entities/user";
import { useEditEntity } from "@shared/lib";

export const useEditUser = () => {
  const { editEntity: editUser, isLoading } = useEditEntity<
    UserEditDto,
    User,
    string
  >(useEditUserMutation);

  return { editUser, isLoading };
};
