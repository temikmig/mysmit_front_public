import { useGetUserQuery } from "../api";

export const useUser = (userId: string) => {
  const { data: user, isLoading } = useGetUserQuery(userId);

  return { user, isLoading };
};
