import dayjs from "dayjs";
import { useEffect } from "react";
import {
  Control,
  useWatch,
  UseFormSetValue,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";

type SalaryMovementBase = {
  movementDate?: Date | string | null;
  isNotChangeBalance: boolean;
};

interface Props<T extends SalaryMovementBase & FieldValues> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
}

export const useAutoSetIsChangeBalanceByDate = <
  T extends SalaryMovementBase & FieldValues,
>({
  control,
  setValue,
}: Props<T>) => {
  const movementDate = useWatch({
    control,
    name: "movementDate" as Path<T>,
  });

  useEffect(() => {
    if (!movementDate) return;

    const isCurrentMonth = dayjs(movementDate).isSame(dayjs(), "month");

    setValue(
      "isNotChangeBalance" as Path<T>,
      !isCurrentMonth as PathValue<T, Path<T>>,
    );
  }, [movementDate, setValue]);
};
