import { User } from "./users";

export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export type LogoutResponse = {
  msg: string;
};
