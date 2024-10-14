// src/components/NumberInput.tsx
import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

interface NumberInputProps {
  label: string;
  value: number;
}

const NumberInput: React.FC<NumberInputProps> = (props: NumberInputProps) => {
  const [value, setValue] = useState<number | string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    const parsedValue = newValue === "" ? "" : Number(newValue);
    setValue(parsedValue);
  };

  const { label } = { ...props };
  return (
    <TextField
      label={label}
      type="number"
      value={props.value}
      onChange={handleChange}
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
