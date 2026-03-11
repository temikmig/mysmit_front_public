import PercentIcon from "@mui/icons-material/Percent";
import { Button, Stack } from "@mui/material";
import { FC } from "react";

import { ServiceCreateDto, ServiceSearchOption } from "@entities/service";
import { ColorPicker } from "@shared/ui/color-picker";
import { FormTextField, FormNumberField } from "@shared/ui/text-fields";

import { useCreateService, useServiceCreateForm } from "../../model";

interface ServiceCreateFormProps {
  onClose?: () => void;
  onSuccess?: (service: ServiceSearchOption) => void;
  initial?: Partial<ServiceCreateDto>;
}

export const ServiceCreateForm: FC<ServiceCreateFormProps> = ({
  onClose,
  onSuccess,
  initial,
}) => {
  const { createService, isLoading } = useCreateService();

  const { control, handleSubmit, formState } = useServiceCreateForm(initial);

  const onSubmit = async (data: ServiceCreateDto) => {
    const newService = await createService(data);

    if (newService) {
      onSuccess?.(newService);
    }

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
          Добавить услугу
        </Button>
      </Stack>
    </form>
  );
};
