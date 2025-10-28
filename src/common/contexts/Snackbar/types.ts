import { type ReactNode } from "react";

export type SnackbarData = {
  title: string;
  message?: ReactNode;
  addMessage?: string;
  mode: "info" | "attention" | "success" | "error";
  duration?: number;
};

export type SnackbarContextType = {
  showSnackbar: (data: SnackbarData) => void;
};
