import React from "react";

import styled from "styled-components";

// Styled Components для стилизации
const ButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto; // Ширина кнопки
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95); // Эффект нажатия
  }
`;

const ButtonText = styled.span`
  font-size: 16px;
  color: #555;
  margin-top: 4px;
`;

export const Button = ({
  onClick,
  onKeyDown,
  label,
}: {
  onClick: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  label: string;
}) => {
  return (
    <ButtonContainer onClick={onClick} onKeyDown={onKeyDown}>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  );
};
