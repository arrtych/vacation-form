// src/components/NumberInput.tsx
import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = (props: NumberInputProps) => {
  // const [value, setValue] = useState<number | string>("");

  const { label, onChange, value } = { ...props };
  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      inputProps={{
        min: 0,
        step: 1,
      }}
    />
  );
};

export default NumberInput;
