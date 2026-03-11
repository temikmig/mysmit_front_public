import { Button, MenuItem, Box } from "@mui/material";
import { FC } from "react";
import { useWatch } from "react-hook-form";

import { EmployeeAutocomplete } from "@entities/employee";
import {
  ROLE_CONFIG,
  User,
  UserEditDto,
  UserRole,
  UserRoleEnum,
  useUserPermissions,
} from "@entities/user";
import { BoxColumn, FormSection, ActionsBox } from "@shared/ui";
import { FormCheckboxField, FormTextField } from "@shared/ui/text-fields";

import { useUserEditForm } from "../../model";
import { useEditUser } from "../../model/useEditUser";

interface UserEditFormProps {
  user: User;
  onClose?: () => void;
}

export const UserEditForm: FC<UserEditFormProps> = ({ user, onClose }) => {
  const { canChangeRole } = useUserPermissions(user);

  const { editUser, isLoading } = useEditUser();

  const { control, handleSubmit, formState } = useUserEditForm(user);

  const onSubmit = async (data: UserEditDto) => {
    await editUser(user.id, data);
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
          <Box flex={1}>
            <FormSection title="Личная информация">
              <FormTextField name="firstName" label="Имя" control={control} />
              <FormTextField
                name="lastName"
                label="Фамилия"
                control={control}
              />
              <FormTextField name="login" label="Логин" control={control} />
              {canChangeRole && (
                <EmployeeAutocomplete
                  label="Выберите сотрудника"
                  name="employeeId"
                  control={control}
                />
              )}
            </FormSection>
          </Box>
          {canChangeRole && (
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
          )}
        </Box>
        <ActionsBox>
          <Button type="submit" disabled={isLoading || !formState.isValid}>
            Редактировать профиль
          </Button>
        </ActionsBox>
      </BoxColumn>
    </form>
  );
};
