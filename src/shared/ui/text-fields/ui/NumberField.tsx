import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import { FormControl, TextField, Box } from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";

import { focusField } from "@shared/lib";

interface NumberFieldProps {
  label?: React.ReactNode;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  icon?: ReactNode;
  moneyMode?: boolean;
  step?: number;
}

export const NumberField: FC<NumberFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  size = "medium",
  error,
  helperText,
  disabled,
  icon,
  moneyMode = false,
  step = moneyMode ? 0.01 : 1,
}) => {
  const [internalValue, setInternalValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const sanitizeInput = (val: string) => {
    let cleaned = val.replace(/[^\d.,]/g, "");
    cleaned = cleaned.replace(",", ".");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts.shift() + "." + parts.join("");
    }
    return cleaned;
  };

  const formatWithThousands = (val: string) => {
    if (!val) return "";

    const num = Number(val.replace(/\s/g, ""));
    if (isNaN(num)) return val;

    const fixed = moneyMode ? num.toFixed(2) : String(num);

    const [intPart, decPart] = fixed.split(".");

    const formattedInt = Number(intPart).toLocaleString("ru-RU");

    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  };

  const handleChange = (val: string) => {
    const sanitized = sanitizeInput(val);
    setInternalValue(sanitized);

    const num = Number(sanitized);
    if (!isNaN(num)) {
      let finalNum = num;

      if (min !== undefined) finalNum = Math.max(finalNum, min);
      if (max !== undefined) finalNum = Math.min(finalNum, max);

      if (moneyMode) {
        finalNum = Number(finalNum.toFixed(2));
      }

      onChange?.(finalNum);
    }
  };

  const handleIncrementDecrement = (val: number) => {
    if (step) {
      const decimals = (step.toString().split(".")[1] || "").length;
      const rounded = Number(val.toFixed(decimals));
      return rounded;
    }
    return val;
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    focusField(e);
    setIsFocused(true);
    setInternalValue(internalValue.replace(/\s/g, ""));
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (internalValue === "") return;

    const num = Number(internalValue.replace(/\s/g, ""));

    if (!isNaN(num)) {
      const fixed = moneyMode ? num.toFixed(2) : String(num);
      setInternalValue(formatWithThousands(fixed));
    }
  };

  useEffect(() => {
    if (value === undefined) return;

    if (isFocused) return;

    const formatted = moneyMode
      ? formatWithThousands(Number(value).toFixed(2))
      : formatWithThousands(String(value));

    setInternalValue(formatted);
  }, [value, moneyMode, isFocused]);

  return (
    <BaseNumberField.Root
      value={value ?? 0}
      onValueChange={(val) => {
        if (val === null) return;
        onChange?.(val);
      }}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={disabled || state.disabled}
          error={error}
          variant="outlined"
          fullWidth
        >
          {props.children}
        </FormControl>
      )}
      min={min}
      max={max}
      step={step}
    >
      <BaseNumberField.Input
        render={(props) => (
          <TextField
            label={label}
            inputRef={props.ref}
            disabled={disabled}
            error={!!error}
            helperText={helperText}
            value={internalValue}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            size={size}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();

                const num = Number(internalValue.replace(/\s/g, "") || 0);
                const newVal =
                  e.key === "ArrowUp"
                    ? handleIncrementDecrement(num + step)
                    : handleIncrementDecrement(num - step);

                let finalVal = newVal;
                if (min !== undefined) finalVal = Math.max(finalVal, min);
                if (max !== undefined) finalVal = Math.min(finalVal, max);

                handleChange(String(finalVal));
              }
            }}
            inputProps={{
              inputMode: "decimal",
            }}
            InputProps={{
              endAdornment: (
                <Box display="flex" alignItems="flex-end" gap={1}>
                  {(icon || moneyMode) && (
                    <Box sx={!moneyMode ? { pt: 2.5 } : { pt: 2.5 }}>
                      {icon || (moneyMode && <CurrencyRubleIcon />)}
                    </Box>
                  )}
                  {/* {!moneyMode && (
                    <InputAdornment
                      position="end"
                      sx={{
                        flexDirection: "column",
                        maxHeight: "unset",
                        alignSelf: "stretch",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        m: 0,
                        "& button": {
                          mr: -1.5,
                          flex: 1,
                          width: 30,
                          p: "6px",
                          borderRadius: 0,
                        },
                      }}
                    >
                      <BaseNumberField.Increment
                        disabled={disabled}
                        render={<IconButton aria-label="Increase" />}
                      >
                        <KeyboardArrowUpIcon
                          fontSize="small"
                          sx={{ transform: "translateY(2px)" }}
                        />
                      </BaseNumberField.Increment>

                      <BaseNumberField.Decrement
                        disabled={disabled}
                        render={<IconButton aria-label="Decrease" />}
                      >
                        <KeyboardArrowDownIcon
                          fontSize="small"
                          sx={{ transform: "translateY(-2px)" }}
                        />
                      </BaseNumberField.Decrement>
                    </InputAdornment>
                  )} */}
                </Box>
              ),
            }}
            InputLabelProps={{
              sx: {
                width: "100%",
              },
            }}
            sx={{
              pr: 0,
              "& input": {
                textAlign: "right",
                pr: 1,
              },
            }}
          />
        )}
      />
    </BaseNumberField.Root>
  );
};
