import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import PercentIcon from "@mui/icons-material/Percent";
import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";

import {
  BusinessConsts,
  BusinessConstsCreateDto,
} from "@entities/businessConsts";
import { FormNumberField } from "@shared/ui/text-fields";

import { useBusinessConstsEditForm } from "../../model/useBusinessConstsEditForm";
import { useEditBusinessConsts } from "../../model/useEditClientSource";

interface BusinessConstsEditFormProps {
  businessConsts: BusinessConsts;
  onClose?: () => void;
}

export const BusinessConstsEditForm: FC<BusinessConstsEditFormProps> = ({
  businessConsts,
  onClose,
}) => {
  const { editBusinessConsts, isLoading } = useEditBusinessConsts();

  const { control, handleSubmit, formState } =
    useBusinessConstsEditForm(businessConsts);

  const onSubmit = async (data: BusinessConstsCreateDto) => {
    await editBusinessConsts(data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormNumberField
          name="businessCosts"
          label="Бизнес-затраты"
          control={control}
          step={0.01}
          min={0}
          icon={<CurrencyRubleIcon />}
        />
        <Box display="flex" gap={2}>
          <FormNumberField
            name="businessGrowth"
            label="Развитие бизнеса"
            control={control}
            step={0.01}
            min={0}
            icon={<PercentIcon />}
          />
          <FormNumberField
            name="financialReserve"
            label="Финансовый резерв"
            control={control}
            step={0.01}
            min={0}
            icon={<PercentIcon />}
          />
        </Box>
        <Box width="100%" display="flex" gap={2}>
          <FormNumberField
            name="cardAcquiring"
            label="Эквайринг карта"
            control={control}
            step={0.001}
            min={0}
            icon={<PercentIcon />}
          />
          <FormNumberField
            name="qrAcquiring"
            label="Эквайринг QR"
            control={control}
            step={0.001}
            min={0}
            icon={<PercentIcon />}
          />
        </Box>
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Редактировать постоянные
        </Button>
      </Stack>
    </form>
  );
};
