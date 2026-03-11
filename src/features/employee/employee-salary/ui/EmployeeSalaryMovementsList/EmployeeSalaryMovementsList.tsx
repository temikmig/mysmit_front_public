import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { FC } from "react";

import { EmployeeSalaryMovement } from "@entities/employee";
import { isMobileRequest } from "@shared/lib";

import { EmployeeSalaryMovementsListItem } from "./EmployeeSalaryMovementsListItem";

interface EmployeeSalaryMovementsListProps {
  movements: EmployeeSalaryMovement[];
  hasMore: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const EmployeeSalaryMovementsList: FC<
  EmployeeSalaryMovementsListProps
> = ({ movements, containerRef }) => {
  const isMobile = isMobileRequest();

  if (movements.length === 0)
    return (
      <Paper sx={{ padding: 2, textAlign: "center" }}>
        История зачислений пуста
      </Paper>
    );
  return (
    <TableContainer
      ref={containerRef}
      component={Paper}
      sx={{
        maxHeight: !isMobile ? 400 : undefined,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Table stickyHeader>
        <TableBody>
          {movements.length > 0 ? (
            movements.map((movement) => (
              <EmployeeSalaryMovementsListItem
                key={movement.id}
                movement={movement}
              />
            ))
          ) : (
            <TableRow>
              <TableCell align="center">История зачислений пуста</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
