import { User } from "@entities/user";

export type LoginDto = {
  login: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};
