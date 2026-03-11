import { Button, MenuItem, Box } from "@mui/material";
import { FC } from "react";
import { useWatch } from "react-hook-form";

import { EmployeeAutocomplete } from "@entities/employee";
import {
  ROLE_CONFIG,
  UserCreateDto,
  UserRole,
  UserRoleEnum,
} from "@entities/user";
import { ActionsBox, BoxColumn, FormSection } from "@shared/ui";
import {
  FormCheckboxField,
  FormPasswordField,
  FormTextField,
} from "@shared/ui/text-fields";

import { useCreateUser, useUserCreateForm } from "../../model";

interface UserEditFormProps {
  onClose?: () => void;
}

export const UserCreateForm: FC<UserEditFormProps> = ({ onClose }) => {
  const { createUser, isLoading } = useCreateUser();

  const { control, handleSubmit, formState } = useUserCreateForm();

  const onSubmit = async (data: UserCreateDto) => {
    await createUser(data);
    onClose?.();
  };

  const userRole = useWatch({
    control,
    name: "role",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BoxColumn>
        <Box display="flex" gap={2}>
          <Box width="50%">
            <FormSection title="Личная информация">
              <FormTextField name="firstName" label="Имя" control={control} />
              <FormTextField
                name="lastName"
                label="Фамилия"
                control={control}
              />
              <FormTextField name="login" label="Логин" control={control} />
              <FormPasswordField
                name="password"
                control={control}
                label="Пароль"
              />
              <EmployeeAutocomplete
                label="Выберите сотрудника"
                name="employeeId"
                control={control}
              />
            </FormSection>
          </Box>
          <Box width="50%">
            <FormSection title="Система">
              <FormTextField
                name="role"
                label="Роль в системе"
                control={control}
                select
              >
                {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                  <MenuItem key={key} value={key as UserRole}>
                    {config.label}
                  </MenuItem>
                ))}
              </FormTextField>

              {userRole === UserRoleEnum.WORKER && (
                <>
                  <FormCheckboxField
                    label="Может видеть все услуги"
                    name="canViewAllServices"
                    control={control}
                  />
                  <FormCheckboxField
                    label="Может видеть все чек-листы"
                    name="canViewAllChecklists"
                    control={control}
                  />
                  <FormCheckboxField
                    label="Может видеть склад"
                    name="canViewStorage"
                    control={control}
                  />
                  <FormCheckboxField
                    label="Может видеть клиентов"
                    name="canViewClients"
                    control={control}
                  />
                  <FormCheckboxField
                    label="Может видеть сотрудников"
                    name="canViewEmployees"
                    control={control}
                  />
                </>
              )}
            </FormSection>
          </Box>
        </Box>
        <ActionsBox>
          <Button type="submit" disabled={isLoading || !formState.isValid}>
            Создать пользователя
          </Button>
        </ActionsBox>
      </BoxColumn>
    </form>
  );
};
