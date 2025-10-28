import { forwardRef } from "react";
import Input from "../Input";
import { IMaskInput } from "react-imask";

import styles from "./PhoneInput.module.css";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  width?: number;
  name: string;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      label,
      error,
      errorMessage,
      disabled,
      width,
      name,
      placeholder,
    },
    ref
  ) => {
    const handleAccept = (val: string) => {
      const event = {
        target: { name, value: val },
        currentTarget: { name, value: val },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    };

    return (
      <Input
        ref={ref}
        label={label}
        error={error}
        errorMessage={errorMessage}
        disabled={disabled}
        width={width}
        inputComponent={
          <IMaskInput
            className={styles.phoneInput}
            mask="+7(000)-000-0000"
            value={value}
            onAccept={handleAccept}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            onBlur={onBlur}
            autoComplete="off"
          />
        }
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
