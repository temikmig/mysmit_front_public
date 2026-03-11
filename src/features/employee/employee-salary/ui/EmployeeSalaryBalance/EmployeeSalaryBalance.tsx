import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Box, Button, Paper } from "@mui/material";
import { FC, useState } from "react";

import { Employee, EmployeeSalaryMovementType } from "@entities/employee";
import { useAuth } from "@features/auth";
import { moneyFormat, useAnimatedNumber } from "@shared/lib";
import { BoxColumn } from "@shared/ui";

import {
  ChangeBalanceButton,
  SalaryCount,
} from "./EmployeeSalaryBalance.styled";
import { EmployeeSalaryMovementCreateForm } from "../EmployeeSalaryMovementCreateForm";

interface EmployeeSalaryBalanceProps {
  employee: Employee;
  reloadList: () => void;
}

export const EmployeeSalaryBalance: FC<EmployeeSalaryBalanceProps> = ({
  employee,
  reloadList,
}) => {
  const { isAdmin } = useAuth();
  const [actionType, setActionType] =
    useState<EmployeeSalaryMovementType | null>(null);
  const [balance, setBalance] = useState(employee.salaryBalance);

  const animatedBalance = useAnimatedNumber(balance);

  const handleFormSuccess = (newBalance: number) => {
    setActionType(null);
    setBalance(newBalance);
    reloadList();
  };

  return (
    <BoxColumn>
      <SalaryCount>{moneyFormat(animatedBalance)}</SalaryCount>
      {isAdmin && (
        <Box
          display="flex"
          gap={2}
          justifyContent="center"
          padding={2}
          component={Paper}
        >
          {actionType ? (
            <Box display="flex" flexDirection="column" flex={1} gap={2}>
              <EmployeeSalaryMovementCreateForm
                employeeId={employee.id}
                actionType={actionType}
                onSuccess={handleFormSuccess}
              />
              <Button variant="outlined" onClick={() => setActionType(null)}>
                Отмена
              </Button>
            </Box>
          ) : (
            <>
              <ChangeBalanceButton
                variant="outlined"
                actionType="INCREASE"
                onClick={() => setActionType("INCREASE")}
              >
                <AddCircleOutlineIcon />
                Пополнить
              </ChangeBalanceButton>
              <ChangeBalanceButton
                variant="outlined"
                actionType="DECREASE"
                onClick={() => setActionType("DECREASE")}
              >
                <ArrowCircleUpIcon />
                Списать
              </ChangeBalanceButton>
            </>
          )}
        </Box>
      )}
    </BoxColumn>
  );
};
