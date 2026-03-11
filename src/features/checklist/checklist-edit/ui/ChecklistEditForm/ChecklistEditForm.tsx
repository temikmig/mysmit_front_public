import { Box, Button, Paper } from "@mui/material";
import { FC, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useModal } from "@app/providers";
import { Checklist, ChecklistEditDto } from "@entities/checklist";
import { useAuth } from "@features/auth";
import {
  InfoSection,
  PaySection,
  ChecklistItems,
  ClientSection,
  EmployeesSection,
  ChecklistAnalytics,
} from "@features/checklist/common";
import { isMobileRequest } from "@shared/lib";
import {
  ActionsBox,
  Footer,
  FormTextField,
  Main,
  ModalGridLayout,
  Sidebar,
} from "@shared/ui";

import { useChecklistEditForm, useEditChecklist } from "../../model";

interface ChecklistEditFormProps {
  checklist: Checklist;
  onClose?: () => void;
}

export const ChecklistEditForm: FC<ChecklistEditFormProps> = ({
  checklist,
  onClose,
}) => {
  const { isAdmin } = useAuth();
  const isMobile = isMobileRequest();
  const { isFullScreen } = useModal();
  const navigate = useNavigate();

  const { editChecklist, isLoading } = useEditChecklist();

  const { control, handleSubmit, formState, setValue } =
    useChecklistEditForm(checklist);

  const serviceId = useWatch({
    control,
    name: "serviceId",
  });

  const onSubmit = async (data: ChecklistEditDto) => {
    await editChecklist(checklist.id, data);
    if (isMobile) navigate(`/m/checklist/${checklist.id}`);
    onClose?.();
  };

  useEffect(() => {
    if (!serviceId) {
      setValue("items", []);
      setValue("salary", 0);
    }
  }, [serviceId, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalGridLayout fullscreen={isFullScreen} isMobile={isMobile}>
        <Main>
          <Box display="flex" flexDirection="column" gap={2}>
            <InfoSection control={control} setValue={setValue} />

            <PaySection control={control} setValue={setValue} />

            <ClientSection control={control} setValue={setValue} />
            <EmployeesSection control={control} />

            <FormTextField
              fullWidth
              name="comment"
              label="Комментарий"
              control={control}
              multiline
              rows={3}
            />
          </Box>
        </Main>
        <Footer>
          {serviceId ? (
            <ChecklistItems
              serviceId={serviceId}
              control={control}
              setValue={setValue}
            />
          ) : (
            <Paper sx={{ padding: 2 }}>Выберите услугу</Paper>
          )}
        </Footer>
        {isAdmin && (
          <Sidebar>
            <ChecklistAnalytics control={control} setValue={setValue} />
          </Sidebar>
        )}
      </ModalGridLayout>
      <ActionsBox>
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Редактировать чек-лист
        </Button>
      </ActionsBox>
    </form>
  );
};
