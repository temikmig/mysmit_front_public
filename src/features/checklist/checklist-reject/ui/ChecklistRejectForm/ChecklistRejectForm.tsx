import { Box, Button } from "@mui/material";
import { FC } from "react";

import { Checklist, ChecklistRejectDto } from "@entities/checklist";
import { FormTextField } from "@shared/ui/text-fields";

import { useChecklistRejectForm, useRejectChecklist } from "../../model";

interface ChecklistRejectFormProps {
  checklist: Checklist;
  onClose?: () => void;
}

export const ChecklistRejectForm: FC<ChecklistRejectFormProps> = ({
  checklist,
  onClose,
}) => {
  const { rejectChecklist, isLoading } = useRejectChecklist();

  const { control, handleSubmit, formState } = useChecklistRejectForm();

  const onSubmit = async (data: ChecklistRejectDto) => {
    await rejectChecklist(checklist.id, data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <FormTextField
          name="rejectedComment"
          label="Комментарий"
          control={control}
          multiline
          rows={3}
        />

        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Отклонить
        </Button>
      </Box>
    </form>
  );
};
