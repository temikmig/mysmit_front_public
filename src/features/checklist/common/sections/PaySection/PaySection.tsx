import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import { Box } from "@mui/material";
import { FC } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { ChecklistCreateDto } from "@entities/checklist";
import {
  ACQUIRING_TYPES_LABELS,
  AcquiringTypeEnum,
  MoneySourceAutocomplete,
  MoneySourceTypeIdEnum,
} from "@entities/moneySource";
import { enumToOptions, isMobileRequest } from "@shared/lib";
import { FormSection, FormNumberField, FormSelectField } from "@shared/ui";

interface PaySectionProps {
  control: Control<ChecklistCreateDto>;
  setValue: UseFormSetValue<ChecklistCreateDto>;
}

export const PaySection: FC<PaySectionProps> = ({ control, setValue }) => {
  const isMobile = isMobileRequest();

  const moneySourceId = useWatch({
    control,
    name: "moneySourceId",
  });

  return (
    <FormSection title="Оплата" flex={1}>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
        <Box flex={1}>
          <FormNumberField
            name="price"
            label="Стоимость"
            control={control}
            icon={<CurrencyRubleIcon />}
            min={0}
          />
        </Box>
        <Box flex={1}>
          <MoneySourceAutocomplete
            label="Оплата на источник"
            control={control}
            name="moneySourceId"
            onChange={() => setValue("acquiringType", AcquiringTypeEnum.NONE)}
          />
        </Box>
        {moneySourceId === MoneySourceTypeIdEnum.BANK_ACCOUNT && (
          <Box flex={1}>
            <FormSelectField
              name="acquiringType"
              label="Эквайринг"
              control={control}
              options={enumToOptions(ACQUIRING_TYPES_LABELS)}
            />
          </Box>
        )}
      </Box>
    </FormSection>
  );
};
