import React, { type ChangeEvent } from "react";

import isString from "lodash/isString";

import { Button, Input, Modal } from "@app/components";

export const AddTeamModal = ({
  isTeamModalOpen,
  closeTeamModal,
  handleTeamNameChange,
  teamName,
  isHomeTeam,
  handleAddHomeTeam,
  handleAddGuestTeam,
}: {
  isTeamModalOpen: boolean;
  isHomeTeam: boolean;
  teamName: string;
  closeTeamModal: () => void;
  handleTeamNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAddHomeTeam: () => void;
  handleAddGuestTeam: () => void;
}) => {
  return (
    <Modal isOpen={isTeamModalOpen} onClose={closeTeamModal}>
      <h2>Добавить команду</h2>
      <Input
        label="Название"
        value={teamName}
        onChange={handleTeamNameChange}
        placeholder="Введите название"
        error={!isString(teamName) ? "должна быть строка" : undefined}
      />

      <Button
        label="добавить"
        onClick={isHomeTeam ? handleAddHomeTeam : handleAddGuestTeam}
      />
    </Modal>
  );
};
