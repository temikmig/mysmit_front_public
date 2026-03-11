import PercentIcon from "@mui/icons-material/Percent";
import { Button, Stack } from "@mui/material";
import { FC } from "react";

import { Service, ServiceEditDto } from "@entities/service";
import { ColorPicker } from "@shared/ui/color-picker";
import { FormTextField, FormNumberField } from "@shared/ui/text-fields";

import { useEditService, useServiceEditForm } from "../../model";

interface ServiceEditFormProps {
  service: Service;
  onClose?: () => void;
}

export const ServiceEditForm: FC<ServiceEditFormProps> = ({
  service,
  onClose,
}) => {
  const { editService, isLoading } = useEditService();

  const { control, handleSubmit, formState } = useServiceEditForm(service);

  const onSubmit = async (data: ServiceEditDto) => {
    await editService(service.id, data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormTextField
          name="name"
          label="Наименование услуги"
          control={control}
        />
        <FormTextField
          name="shortName"
          label="Короткое наименование"
          control={control}
        />
        <ColorPicker
          name="color"
          label="Цвет карточки"
          textField={false}
          control={control}
        />
        <FormNumberField
          label="Процент на зарплату"
          name="salaryPercent"
          control={control}
          min={0}
          max={100}
          icon={<PercentIcon fontSize="large" />}
        />
        <FormNumberField
          label="Количество постов"
          name="postNumber"
          control={control}
          min={1}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Редактировать услугу
        </Button>
      </Stack>
    </form>
  );
};
