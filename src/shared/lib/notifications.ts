import { enqueueSnackbar } from "notistack";

import { ApiError } from "@shared/api";

export const showSuccess = (message: string) => {
  enqueueSnackbar(message, {
    variant: "success",
    anchorOrigin: { vertical: "top", horizontal: "center" },
  });
};

export const showError = (error: unknown) => {
  const err = error as ApiError;

  enqueueSnackbar(err?.data?.msg ?? "Произошла ошибка", {
    variant: "error",
    anchorOrigin: { vertical: "top", horizontal: "center" },
  });
};
