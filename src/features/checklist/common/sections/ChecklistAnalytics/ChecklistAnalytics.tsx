import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { useBusinessConsts } from "@entities/businessConsts";
import { ChecklistCreateDto } from "@entities/checklist";
import { AcquiringTypeEnum } from "@entities/moneySource";
import { FormNumberField } from "@shared/ui";

interface ChecklistAnalyticsProps {
  control: Control<ChecklistCreateDto>;
  setValue: UseFormSetValue<ChecklistCreateDto>;
}

export const ChecklistAnalytics: FC<ChecklistAnalyticsProps> = ({
  control,
  setValue,
}) => {
  const { businessConsts } = useBusinessConsts();

  const clientId = useWatch({
    control,
    name: "clientId",
  });

  const acquiringType = useWatch({
    control,
    name: "acquiringType",
  });

  const price = useWatch({
    control,
    name: "price",
  });

  const [
    businessExpenses = 0,
    directExpenses = 0,
    toolEquipment = 0,
    salary = 0,
    financialReserve = 0,
    businessGrowth = 0,
    acquiring = 0,
    loyalty = 0,
    loyaltyWriteOff = 0,
    acquisition = 0,
  ] = useWatch({
    control,
    name: [
      "businessExpenses",
      "directExpenses",
      "toolEquipment",
      "salary",
      "financialReserve",
      "businessGrowth",
      "acquiring",
      "loyalty",
      "loyaltyWriteOff",
      "acquisition",
    ],
  });

  const { allCosts, profit, total } = useMemo(() => {
    const allCosts =
      businessExpenses +
      directExpenses +
      toolEquipment +
      salary +
      financialReserve +
      businessGrowth +
      acquiring +
      loyalty +
      acquisition;

    return {
      allCosts,
      profit: price - allCosts,
      total: price - loyaltyWriteOff,
    };
  }, [
    businessExpenses,
    directExpenses,
    toolEquipment,
    salary,
    financialReserve,
    businessGrowth,
    acquiring,
    loyalty,
    acquisition,
    price,
    loyaltyWriteOff,
  ]);

  const analyticsFields: {
    name: keyof ChecklistCreateDto;
    label: string;
    disabled?: boolean;
    show: boolean;
  }[] = [
    { name: "businessExpenses", label: "Бизнес-затраты", show: true },
    { name: "directExpenses", label: "Прямые затраты", show: true },
    { name: "toolEquipment", label: "Инструменты и материалы", show: true },
    { name: "salary", label: "Зарплата", show: true },
    {
      name: "financialReserve",
      label: "Финансовый резерв",
      show: Boolean(businessConsts?.financialReserve),
    },
    {
      name: "businessGrowth",
      label: "Развитие бизнеса",
      show: Boolean(businessConsts?.businessGrowth),
    },
    {
      name: "acquiring",
      label: "Процент эквайринга",
      show: Boolean(acquiringType !== "NONE"),
    },
    { name: "loyalty", label: "Карта лояльности", show: Boolean(clientId) },
    {
      name: "loyaltyWriteOff",
      label: "Списано с карты лояльности",
      show: Boolean(clientId),
    },
    { name: "acquisition", label: "Привлечение", show: true },
    { name: "allCosts", label: "Затраты", show: true, disabled: true },
    { name: "profit", label: "Прибыль", show: true, disabled: true },
    { name: "total", label: "Итого", show: true, disabled: true },
  ];

  useEffect(() => {
    if (businessConsts) {
      const businessCosts = businessConsts.businessCosts;
      setValue("businessExpenses", businessCosts);
    }
  }, [businessConsts]);

  useEffect(() => {
    if (businessConsts) {
      const card = businessConsts.cardAcquiring;
      const qr = businessConsts.qrAcquiring;

      let acquiringVal = 0;

      if (acquiringType === AcquiringTypeEnum.CARD) acquiringVal = price * card;
      if (acquiringType === AcquiringTypeEnum.QR) acquiringVal = price * qr;

      setValue("acquiring", acquiringVal);
    }
  }, [businessConsts, acquiringType, price, setValue]);

  useEffect(() => {
    setValue("allCosts", allCosts, { shouldDirty: false });
    setValue("total", total, { shouldDirty: false });
    setValue("profit", profit, { shouldDirty: false });
  }, [allCosts, profit, total, setValue]);

  return (
    <Paper
      sx={{
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table size="small">
          <TableBody>
            {analyticsFields.map(
              ({ name, label, disabled, show }) =>
                show && (
                  <TableRow hover key={name}>
                    <TableCell sx={{ p: 1 }}>
                      <FormNumberField
                        moneyMode
                        control={control}
                        name={name}
                        label={label}
                        icon={<CurrencyRubleIcon />}
                        disabled={disabled}
                      />
                    </TableCell>
                  </TableRow>
                ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
