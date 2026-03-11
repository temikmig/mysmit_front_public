import { User } from "@entities/user";

export interface RefreshResponse {
  accessToken: string;
  user: User;
}
