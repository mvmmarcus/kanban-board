import React, { useState, InputHTMLAttributes } from "react";

import { Wrapper, Input, InputWrapper, Error } from "./styles";

export type TextFieldProps = {
  onInputChange?: (value: string) => void;
  initialValue?: string;
  disabled?: boolean;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  name,
  initialValue = "",
  error,
  disabled = false,
  onInputChange,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    !!onInputChange && onInputChange(newValue);
  };

  return (
    <Wrapper disabled={disabled} error={!!error}>
      <InputWrapper>
        <Input
          type="text"
          onChange={onChange}
          value={value}
          disabled={disabled}
          name={name}
          {...props}
        />
      </InputWrapper>
      {!!error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default TextField;
