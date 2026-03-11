import { Box, Paper } from "@mui/material";
import { FC, useMemo } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import {
  useGetChecklistProductsByIdsQuery,
  useGetChecklistServiceDataQuery,
} from "@entities/checklist";
import { ChecklistCreateDto } from "@entities/checklist";
import { FormSection, FormTextField, Loader } from "@shared/ui";

import { ChecklistItemAdd } from "./ChecklistItemAdd";
import { ChecklistItemsTable } from "./ChecklistItemsTable";

interface ChecklistItemsProps {
  serviceId?: number;
  control: Control<ChecklistCreateDto>;
  setValue: UseFormSetValue<ChecklistCreateDto>;
}

export const ChecklistItems: FC<ChecklistItemsProps> = ({
  serviceId,
  control,
  setValue,
}) => {
  const { data, isLoading } = useGetChecklistServiceDataQuery(serviceId!, {
    skip: !serviceId,
  });

  const productsFromService = useMemo(() => data?.data?.products ?? [], [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useWatch({ control, name: "items" }) || [];

  const customIds = useMemo(() => {
    if (!data) return [];

    return items
      .filter((f) => !productsFromService.some((p) => p.id === f.productId))
      .map((f) => f.productId)
      .filter(Boolean) as number[];
  }, [items, productsFromService]);

  const { data: dataCustom } = useGetChecklistProductsByIdsQuery(customIds, {
    skip: !customIds.length,
  });

  const productsCustomFiltered = useMemo(() => {
    if (!dataCustom?.data) return [];

    return dataCustom.data.filter((p) =>
      items.some((f) => f.productId === p.id),
    );
  }, [dataCustom, items]);

  if (isLoading) return <Loader />;
  if (!serviceId) return null;

  return (
    <FormSection title="Материалы">
      <Box display="flex" flexDirection="column" gap={2}>
        {productsFromService.length > 0 ? (
          <ChecklistItemsTable
            control={control}
            products={productsFromService}
            setValue={setValue}
            serviceId={serviceId}
          />
        ) : (
          <Paper sx={{ p: 2 }}>Материалы отсутствуют</Paper>
        )}
        <ChecklistItemAdd control={control} serviceId={serviceId} />
        {productsCustomFiltered.length > 0 && (
          <ChecklistItemsTable
            control={control}
            products={productsCustomFiltered}
            setValue={setValue}
            isSearch={false}
          />
        )}
        <FormTextField
          name="itemsComment"
          label="Комментарий по материалам"
          control={control}
          multiline
          rows={3}
        />
      </Box>
    </FormSection>
  );
};
