import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
  OutlinedInputProps,
} from "@mui/material";
import { useState, forwardRef } from "react";

export const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ InputProps, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
      <TextField
        {...props}
        type={showPassword ? "text" : "password"}
        inputRef={ref}
        InputProps={
          {
            ...InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePassword} edge="end" tabIndex={-1}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          } as Partial<OutlinedInputProps>
        }
      />
    );
  },
);

PasswordField.displayName = "PasswordField";
