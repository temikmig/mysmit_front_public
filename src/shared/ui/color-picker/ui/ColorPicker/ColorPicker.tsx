import {
  TextField,
  Box,
  TextFieldProps,
  Paper,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";

import { getContrastColor } from "@shared/lib";

import { ColorBox } from "./ColorPicker.styled";

interface ColorPickerField<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  name: FieldPath<T>;
  control: Control<T>;
  textField?: boolean;
}

export const ColorPicker = <T extends FieldValues>({
  name,
  control,
  textField = true,
  ...textFieldProps
}: ColorPickerField<T>) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box display="flex" gap={1}>
          <ClickAwayListener onClickAway={handleClose}>
            <Box display="flex" alignItems="center" flex={1} gap={1}>
              <ColorBox
                onClick={handleClick}
                sx={{
                  bgcolor: field.value,
                  color: getContrastColor(field.value),
                }}
              >
                {textFieldProps.label}
              </ColorBox>

              <Popper
                open={open && !!anchorEl}
                anchorEl={anchorEl}
                placement="top-start"
                sx={{ zIndex: 99900000 }}
                modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
              >
                <Paper sx={{ p: 1 }}>
                  <HexColorPicker
                    color={field.value}
                    onChange={field.onChange}
                  />
                </Paper>
              </Popper>
            </Box>
          </ClickAwayListener>
          {textField && (
            <TextField
              {...textFieldProps}
              {...field}
              value={field.value ?? ""}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              size="small"
              sx={{ flex: 1 }}
            />
          )}
        </Box>
      )}
    />
  );
};
