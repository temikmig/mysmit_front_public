import { User, UserAvatar } from "@entities/user";

interface UserMenuButtonProps {
  user: User;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const UserMenuButton = ({ user, onClick }: UserMenuButtonProps) => {
  return <UserAvatar size={40} user={user} onClick={onClick} />;
};
