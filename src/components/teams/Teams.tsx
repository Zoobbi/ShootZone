import React from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import { Button } from "@app/components";
import { AddPlayerModal } from "@app/components/teams/AddPlayerModal";
import { AddTeamModal } from "@app/components/teams/AddTeamModal";
import { useKeyboard } from "@app/components/teams/useKeyboard";
import { selectHomeTeamSide } from "@app/redux/selectors";
import {
  selectActivePlayer,
  selectActiveTeamData,
} from "@app/redux/selectors/selectors";
import { LEFT_SIDE } from "@app/redux/teams-slice/teamsSlice";

import { PlayersList } from "./PlayersList";
import { useTeams } from "./useTeams";

// Styled Components для стилизации
const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Разделяем колонки */
  gap: 20px; /* Расстояние между колонками */
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const TeamColumnWrapper = styled.div`
  width: 48%; /* Каждая колонка занимает половину ширины */
`;

const TeamColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Расстояние между игроками */

  &:first-child {
    border-right: 2px solid black;
  }
`;

const SettingsButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubmitWrapper = styled.div`
  display: flex;
  margin-top: 15px;
`;

// Компонент Teams
export const Teams = () => {
  const homeTeamsSide = useSelector(selectHomeTeamSide);

  const activePlayer = useSelector(selectActivePlayer);
  const activeTeam = useSelector(selectActiveTeamData);

  const {
    isPlayerModalOpen,
    isTeamModalOpen,
    surname,
    teamName,
    playerNumber,
    isHomePlayer,
    isHomeTeam,
    openModalHome,
    openModalGuest,
    closePlayerModal,
    closeTeamModal,
    handleNameChange,
    handleNumberChange,
    handleAddHomeTeamPlayer,
    handleAddGuestTeamPlayer,
    handleChangeTeamsSide,
    handlePlayerMadeFreeThrow,
    handlePlayerMissFreeThrow,
    openModalTeamHome,
    openModalTeamGuest,
    handleClearHomeTeam,
    handleClearGuestTeam,
    homePlayers,
    guestPlayers,
    handleSetHomeTeam,
    handleSetGuestTeam,
    handleSetHomeTeamName,
    handleSetGuestTeamName,
    handleTeamNameChange,
    homeNumberError,
    guestNumberError,
    handleDevLog,
    handleRemovePlayerMadeFreeThrow,
    handleRemovePlayerMissFreeThrow,
    exportCanvas,
  } = useTeams();

  useKeyboard({
    activePlayer,
    handlePlayerMadeFreeThrow,
  });

  return (
    <div>
      <TeamsContainer>
        {/* Левая колонка: команда хозяев */}
        <TeamColumnWrapper>
          <TeamColumn>
            <PlayersList
              teamPlayers={
                homeTeamsSide === LEFT_SIDE ? homePlayers : guestPlayers
              }
            />
          </TeamColumn>
        </TeamColumnWrapper>

        {/* Правая колонка: команда гостей */}
        <TeamColumnWrapper>
          <TeamColumn>
            <PlayersList
              teamPlayers={
                homeTeamsSide === LEFT_SIDE ? guestPlayers : homePlayers
              }
            />
          </TeamColumn>
        </TeamColumnWrapper>
      </TeamsContainer>
      <SettingsButtons>
        {activePlayer && (
          <>
            <Button label="шт +" onClick={handlePlayerMadeFreeThrow} />
            <Button label="шт -" onClick={handlePlayerMissFreeThrow} />
            <Button label="уд шт +" onClick={handleRemovePlayerMadeFreeThrow} />
            <Button label="уд шт -" onClick={handleRemovePlayerMissFreeThrow} />
          </>
        )}
        <Button label="+ игрок дом" onClick={openModalHome} />
        <Button label="+ игрок выезд" onClick={openModalGuest} />
        <Button label={"имя дома"} onClick={openModalTeamHome} />
        <Button label="имя выезд" onClick={openModalTeamGuest} />
        <Button label="очистить дом" onClick={handleClearHomeTeam} />
        <Button label="очистить выезд" onClick={handleClearGuestTeam} />
        <Button label="сменить стороны" onClick={handleChangeTeamsSide} />
        <Button label="log" onClick={handleDevLog} />
        <Button
          label="экспорт"
          onClick={() =>
            exportCanvas(
              activePlayer
                ? `${activePlayer?.surname}-${activePlayer?.playerNumber}`
                : activeTeam?.name || "unknown team",
            )
          }
        />
        <Button label="дом" onClick={handleSetHomeTeam} />
        <Button label="гости" onClick={handleSetGuestTeam} />
      </SettingsButtons>
      <AddPlayerModal
        isPlayerModalOpen={isPlayerModalOpen}
        closePlayerModal={closePlayerModal}
        surname={surname}
        playerNumber={playerNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        isHomePlayer={isHomePlayer}
        homeNumberError={homeNumberError}
        guestNumberError={guestNumberError}
        handleAddHomeTeamPlayer={handleAddHomeTeamPlayer}
        handleAddGuestTeamPlayer={handleAddGuestTeamPlayer}
      />
      <AddTeamModal
        isTeamModalOpen={isTeamModalOpen}
        closeTeamModal={closeTeamModal}
        handleTeamNameChange={handleTeamNameChange}
        teamName={teamName}
        isHomeTeam={isHomeTeam}
        handleAddHomeTeam={handleSetHomeTeamName}
        handleAddGuestTeam={handleSetGuestTeamName}
      />
    </div>
  );
};
