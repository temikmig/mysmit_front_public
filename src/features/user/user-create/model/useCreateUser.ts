import { useCreateUserMutation, User, UserCreateDto } from "@entities/user";
import { useCreateEntity } from "@shared/lib";

export const useCreateUser = () => {
  const { createEntity: createUser, isLoading } = useCreateEntity<
    UserCreateDto,
    User
  >(useCreateUserMutation);

  return { createUser, isLoading };
};
