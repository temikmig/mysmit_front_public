import { DialogContentText, Button } from "@mui/material";
import { FC } from "react";

import { ActionsBox } from "./MessageDialog.styled";

interface MessageDialogProps {
  description?: string;
  confirmButton?: { label: string; onClick: () => void; disabled?: boolean };
  cancelButton?: { label: string; onClick: () => void; disabled?: boolean };
}

export const MessageDialog: FC<MessageDialogProps> = ({
  description,
  confirmButton,
  cancelButton,
}) => {
  return (
    <>
      {description && <DialogContentText>{description}</DialogContentText>}
      <ActionsBox>
        {cancelButton && (
          <Button
            size="large"
            variant="outlined"
            onClick={cancelButton.onClick}
            disabled={cancelButton.disabled}
          >
            {cancelButton.label}
          </Button>
        )}
        {confirmButton && (
          <Button
            size="large"
            variant="contained"
            onClick={confirmButton.onClick}
            disabled={confirmButton.disabled}
            autoFocus
          >
            {confirmButton.label}
          </Button>
        )}
      </ActionsBox>
    </>
  );
};
