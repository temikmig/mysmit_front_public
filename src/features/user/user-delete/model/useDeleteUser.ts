import { useDeleteUserMutation } from "@entities/user";
import { showError, showSuccess } from "@shared/lib";

export const useDeleteUser = () => {
  const [del, { isLoading }] = useDeleteUserMutation();

  const deleteUser = async (id: string) => {
    try {
      const result = await del(id).unwrap();
      showSuccess(result.message);
    } catch (err) {
      showError(err);
      throw err;
    }
  };

  return { deleteUser, isLoading };
};
