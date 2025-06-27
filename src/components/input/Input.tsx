import React from "react";

import styled from "styled-components";

import type { InputProps } from "./types";

// Styled Components для стилизации
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 400px; // Максимальная ширина
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff; // Подсветка при фокусе
  }

  &::placeholder {
    color: #aaa; // Цвет placeholder
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #ff4d4f; // Красный цвет для ошибок
  margin-top: 4px;
`;

// Компонент Input
export const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  onKeyDown,
}: InputProps) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};
