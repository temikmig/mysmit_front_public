import { Box } from "@mui/material";
import { FC } from "react";

import { Employee } from "@entities/employee/model";
import { ServiceBadge } from "@entities/service";
import { ExpandableBox, InfoGroup, StackColumn } from "@shared/ui";

interface EmployeeDetailsProps {
  employee: Employee;
}

export const EmployeeDetails: FC<EmployeeDetailsProps> = ({ employee }) => {
  return (
    <StackColumn>
      <InfoGroup
        items={[
          {
            label: "Имя сотрудника",
            value: `${employee.firstName} ${employee.lastName}`,
          },
          {
            label: "Телефон",
            value: employee.phone,
          },
          {
            label: `Услуги${employee.services.length > 1 ? ` (${employee.services.length})` : ""}`,
            value: employee.services.length > 0 && (
              <ExpandableBox maxCollapsedHeight={40}>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {employee.services.map((service) => (
                    <ServiceBadge
                      key={service.name}
                      service={service}
                      openService
                    />
                  ))}
                </Box>
              </ExpandableBox>
            ),
            replacement: "Не указаны",
          },
        ]}
        columns={1}
      />
    </StackColumn>
  );
};
