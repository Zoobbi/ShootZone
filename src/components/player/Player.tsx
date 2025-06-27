import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { resetTeamMode } from "@app/redux/mode-slice/modeSlice";
import { setActivePlayer } from "@app/redux/players-slice/playersSlice";
import {
  selectActivePlayer,
  selectAllTeamPlayers,
} from "@app/redux/selectors/selectors";
import { removePlayer } from "@app/redux/teams-slice/teamsSlice";
import type { CommonPlayer } from "@app/redux/types";

// Styled Components для стилизации
const PlayerContainer = styled.div<{ isActive: boolean }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  max-height: 60px;
  padding: 4px;
  border: 2px solid ${(props) => (props.isActive ? "#007bff" : "#ccc")}; // Изменяем цвет границы
  border-radius: 8px;
  background-color: ${(props) =>
    props.isActive ? "#e7f3ff" : "#f9f9f9"}; // Изменяем фон
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer; // Добавляем указатель мыши
  transition: all 0.3s ease; // Плавные переходы

  &:hover {
    border-color: ${(props) =>
      props.isActive ? "#0056b3" : "#aaa"}; // Эффект при наведении
    background-color: ${(props) => (props.isActive ? "#d1e7fd" : "#f0f0f0")};
  }
`;

const PlayerNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const PlayerName = styled.span`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
  white-space: nowrap; /* Запрещаем перенос */
  overflow: hidden; /* Скрываем выходящий текст */
  text-overflow: ellipsis; /* Добавляем многоточие */
  max-width: 100px; /* Фиксированная ширина */
`;

const PlayerDelete = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

// Компонент Player
export const Player = ({ playerNumber, surname, id }: CommonPlayer) => {
  const dispatch = useDispatch();
  const allPlayers = useSelector(selectAllTeamPlayers);
  const activePlayer = useSelector(selectActivePlayer);

  const onClickHandler = useCallback(() => {
    dispatch(setActivePlayer(allPlayers.find((player) => player.id === id)));
    dispatch(resetTeamMode());
  }, [allPlayers, dispatch, id]);

  const onDeleteHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const player = allPlayers.find((player) => player.id === id);

      dispatch(removePlayer(player));
      dispatch(setActivePlayer(null));
    },
    [activePlayer, allPlayers, dispatch, id],
  );

  console.log("player", activePlayer);

  return (
    <PlayerContainer
      onClick={onClickHandler}
      role="button"
      isActive={activePlayer?.id === id}
    >
      <PlayerDelete onClick={onDeleteHandler}>D</PlayerDelete>
      <PlayerNumber>{playerNumber}</PlayerNumber>
      <PlayerName>{surname}</PlayerName>
    </PlayerContainer>
  );
};
