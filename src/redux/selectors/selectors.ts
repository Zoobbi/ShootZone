import { createSelector } from "reselect";

import {
  LEFT_SIDE,
  RIGHT_SIDE,
  TEAM_GUEST,
  TEAM_HOME,
} from "@app/redux/teams-slice/teamsSlice";
import type { State, TeamMarkers } from "@app/redux/types";

// Базовый селектор для получения всего состояния teams
const selectTeams = (state: State) => state.teams;
const selectPlayers = (state: State) => state.players;
const selectMode = (state: State) => state.mode;

const selectAllPlayers = (state: State) => [
  ...state.teams.teamHome.players,
  ...state.teams.teamGuest.players,
];

// Мемоизированный селектор для получения игроков домашней команды
export const selectAllTeams = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => teams, // Производная логика
);

export const selectHomeTeamPlayers = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => teams.teamHome.players, // Производная логика
);

export const selectTeamsMarkers = createSelector(
  [selectTeams],
  (teams): TeamMarkers => {
    return {
      homeTeamMarkers: teams.teamHome.players.flatMap(
        (player) => player.markers,
      ),
      guestTeamMarkers: teams.teamGuest.players.flatMap(
        (player) => player.markers,
      ),
    };
  },
);

export const selectHomeTeamSide = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => teams.teamHome.side, // Производная логика
);

// Мемоизированный селектор для получения игроков гостевой команды
export const selectGuestTeamPlayers = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => teams.teamGuest.players, // Производная логика
);

export const selectAllTeamPlayers = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => {
    return [...teams.teamHome.players, ...teams.teamGuest.players];
  }, // Производная логика
);

export const selectActiveTeam = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => {
    return teams.activeTeam;
  }, // Производная логика
);

export const selectActiveTeamSide = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => {
    if (teams.activeTeam === TEAM_HOME) {
      return LEFT_SIDE;
    }

    if (teams.activeTeam === TEAM_GUEST) {
      return RIGHT_SIDE;
    }

    return "";
  },
);

export const selectActiveTeamData = createSelector(
  [selectTeams], // Зависимость: базовый селектор
  (teams) => {
    if (teams.activeTeam === TEAM_HOME) {
      return teams.teamHome;
    }

    if (teams.activeTeam === TEAM_GUEST) {
      return teams.teamGuest;
    }

    return null;
  },
);

export const selectActivePlayer = createSelector(
  [selectPlayers], // Зависимость: базовый селектор
  (players) => {
    return players.activePlayer;
  }, // Производная логика
);

export const selectPlayerMarkers = createSelector(
  (state: State, playerId: string) => ({
    players: selectAllPlayers(state),
    playerId,
  }),
  ({ players, playerId }) => {
    const player = players.find((p) => p.id === playerId);

    return player ? player.markers : [];
  },
);

export const selectPlayer = createSelector(
  (state: State, playerId: string) => ({
    players: selectAllPlayers(state),
    playerId,
  }),
  ({ players, playerId }) => {
    return players.find((p) => p.id === playerId);
  },
);

export const selectActivePlayerSide = createSelector(
  (state: State, playerId: string) => ({
    players: selectAllPlayers(state),
    teams: selectTeams(state),
    playerId,
  }),
  ({ players, teams, playerId }) => {
    const player = players.find((p) => p.id === playerId);

    if (!player) {
      return null;
    }

    const isHomePlayer = player ? player.isHomePlayer : null;

    return isHomePlayer ? teams.teamHome.side : teams.teamGuest.side;
  },
);

export const selectTeamModeStatus = createSelector(
  [selectMode], // Зависимость: базовый селектор
  (mode) => mode.isTeamMode, // Производная логика
);
