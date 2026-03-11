import { useChangePasswordUserMutation, UserPasswordDto } from "@entities/user";
import { showError, showSuccess } from "@shared/lib";

export const usePasswordUser = () => {
  const [change, { isLoading }] = useChangePasswordUserMutation();

  const changePassword = async (id: string, data: UserPasswordDto) => {
    try {
      const result = await change({ id, data }).unwrap();
      showSuccess(result.message);
    } catch (err) {
      showError(err);
      throw err;
    }
  };

  return { changePassword, isLoading };
};
