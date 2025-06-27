import type { ChangeEvent, KeyboardEvent } from "react";
import React, { useCallback } from "react";

import isString from "lodash/isString";
import styled from "styled-components";

import { Button, Input, Modal } from "@app/components";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AddPlayerModal = ({
  isPlayerModalOpen,
  closePlayerModal,
  surname,
  playerNumber,
  handleNameChange,
  handleNumberChange,
  isHomePlayer,
  homeNumberError,
  guestNumberError,
  handleAddHomeTeamPlayer,
  handleAddGuestTeamPlayer,
}: {
  isPlayerModalOpen: boolean;
  closePlayerModal: () => void;
  handleAddHomeTeamPlayer: () => void;
  handleAddGuestTeamPlayer: () => void;
  surname: string;
  playerNumber: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isHomePlayer: boolean;
  homeNumberError?: string;
  guestNumberError?: string;
}) => {
  // Определяем callback для добавления игрока
  const clickCallback = isHomePlayer
    ? handleAddHomeTeamPlayer
    : handleAddGuestTeamPlayer;

  // Обработчик нажатия клавиш
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        clickCallback();
      }
    },
    [clickCallback],
  );

  return (
    <Modal isOpen={isPlayerModalOpen} onClose={closePlayerModal}>
      <ModalContent>
        <h2>Добавить игрока</h2>
        <Input
          label="Фамилия"
          value={surname}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
          placeholder="Введите фамилию"
          error={!isString(surname) ? "должна быть строка" : undefined}
        />
        <Input
          label="Номер"
          value={playerNumber}
          onChange={handleNumberChange}
          onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
          type="number"
          placeholder="Введите номер"
          error={isHomePlayer ? homeNumberError : guestNumberError}
        />
        <Button label="добавить" onClick={clickCallback} />
      </ModalContent>
    </Modal>
  );
};
