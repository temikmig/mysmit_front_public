import { FC } from "react";
import { Control, useWatch } from "react-hook-form";

import { ChecklistCreateDto } from "@entities/checklist";
import { EmployeeChecklistAutocomplete } from "@entities/employee";
import { FormSection } from "@shared/ui";

interface EmployeesSectionProps {
  control: Control<ChecklistCreateDto>;
}

export const EmployeesSection: FC<EmployeesSectionProps> = ({ control }) => {
  const salary = useWatch({
    control,
    name: "salary",
  });

  return (
    <FormSection title="Сотрудник">
      <EmployeeChecklistAutocomplete
        label="Сотрудник"
        name="employees"
        control={control}
        salary={salary}
      />
    </FormSection>
  );
};
