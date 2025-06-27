import { createSlice } from "@reduxjs/toolkit";

import {
  THREE_POINTS_ZONE,
  TWO_POINTS_ZONE,
} from "@app/components/basketball-court/constants";

import type { Player, TeamsState } from "../types";

export const LEFT_SIDE = "leftSide";
export const RIGHT_SIDE = "rightSide";
export const TEAM_HOME = "teamHome";
export const TEAM_GUEST = "teamGuest";

const teamPropsInitialState = {
  players: [], // Массив игроков домашней команды
  name: "",
  twoPointsAll: 0,
  twoPointsMade: 0,
  threePointsAll: 0,
  threePointsMade: 0,
  freeThrowMade: 0,
  freeThrowAll: 0,
  allShots: 0,
  allShotsMade: 0,
  points: 0,
};

const initialState: TeamsState = {
  activeTeam: "",
  teamHome: {
    side: LEFT_SIDE,
    ...teamPropsInitialState,
  },
  teamGuest: {
    side: RIGHT_SIDE,
    ...teamPropsInitialState,
  },
};

const teamsSlice = createSlice({
  name: "teams", // Имя слайса
  initialState,
  reducers: {
    // Добавление игрока в домашнюю команду
    addHomeTeamPlayer: (state, action) => {
      state.teamHome.players.push(action.payload); // Добавляем игрока в массив
    },

    addHomeTeamName: (state, action) => {
      state.teamHome.name = action.payload;
    },

    removePlayer: (state, action) => {
      const player = action.payload as Player;

      if (!player) {
        return;
      }

      const playerID = player.id;

      if (player.isHomePlayer) {
        const playerIndex = state.teamHome.players.findIndex(
          (item: Player) => item?.id === playerID,
        );

        state.teamHome.players.splice(playerIndex, 1);
      } else {
        const playerIndex = state.teamGuest.players.findIndex(
          (item: Player) => item?.id === playerID,
        );

        state.teamGuest.players.splice(playerIndex, 1);
      }
    },

    addGuestTeamName: (state, action) => {
      state.teamGuest.name = action.payload;
    },

    // Добавление игрока в гостевую команду
    addGuestTeamPlayer: (state, action) => {
      state.teamGuest.players.push(action.payload); // Добавляем игрока в массив
    },

    changeTeamsSide: (state) => {
      state.teamHome.side =
        state.teamHome.side === LEFT_SIDE ? RIGHT_SIDE : LEFT_SIDE;

      state.teamGuest.side =
        state.teamGuest.side === LEFT_SIDE ? RIGHT_SIDE : LEFT_SIDE;
    },

    // Очистка всех игроков домашней команды
    clearHomeTeamPlayers: (state) => {
      state.teamHome.players = []; // Очищаем массив игроков домашней команды
    },

    // Очистка всех игроков гостевой команды
    clearGuestTeamPlayers: (state) => {
      state.teamGuest.players = []; // Очищаем массив игроков гостевой команды
    },

    setActiveHomeTeam: (state) => {
      state.activeTeam = TEAM_HOME; // Очищаем массив игроков гостевой команды
    },

    setActiveGuestTeam: (state) => {
      state.activeTeam = TEAM_GUEST; // Очищаем массив игроков гостевой команды
    },

    // Очистка всех игроков обеих команд
    clearHomeTeam: (state) => {
      state.teamHome = {
        ...initialState.teamHome,
      };
    },

    clearGuestTeam: (state) => {
      state.teamGuest = {
        ...initialState.teamGuest,
      };
    },

    addMarkerToPlayer: (state, action) => {
      const { playerId, marker } = action.payload;
      const player = [
        ...state.teamHome.players,
        ...state.teamGuest.players,
      ].find((p) => p.id === playerId);
      if (player) {
        player.markers?.push(marker);

        const { cost, type } = marker;

        if (type === "circle") {
          if (cost === TWO_POINTS_ZONE) {
            player.twoPointsMade = player.twoPointsMade + 1;
            player.twoPointsAll = player.twoPointsAll + 1;
            player.allShotsMade = player.allShotsMade + 1;
            player.allShots = player.allShots + 1;
            player.points = player.points + 2;

            if (player.isHomePlayer) {
              state.teamHome.twoPointsMade = state.teamHome.twoPointsMade + 1;
              state.teamHome.twoPointsAll = state.teamHome.twoPointsAll + 1;
              state.teamHome.allShotsMade = state.teamHome.allShotsMade + 1;
              state.teamHome.allShots = state.teamHome.allShots + 1;
              state.teamHome.points = state.teamHome.points + 2;
            } else {
              state.teamGuest.twoPointsMade = state.teamGuest.twoPointsMade + 1;
              state.teamGuest.twoPointsAll = state.teamGuest.twoPointsAll + 1;
              state.teamGuest.allShotsMade = state.teamGuest.allShotsMade + 1;
              state.teamGuest.allShots = state.teamGuest.allShots + 1;
              state.teamGuest.points = state.teamGuest.points + 2;
            }
          }

          if (cost === THREE_POINTS_ZONE) {
            player.threePointsMade = player.threePointsMade + 1;
            player.threePointsAll = player.threePointsAll + 1;
            player.allShotsMade = player.allShotsMade + 1;
            player.allShots = player.allShots + 1;
            player.points = player.points + 3;

            if (player.isHomePlayer) {
              state.teamHome.threePointsMade =
                state.teamHome.threePointsMade + 1;
              state.teamHome.threePointsAll = state.teamHome.threePointsAll + 1;
              state.teamHome.allShotsMade = state.teamHome.allShotsMade + 1;
              state.teamHome.allShots = state.teamHome.allShots + 1;
              state.teamHome.points = state.teamHome.points + 3;
            } else {
              state.teamGuest.threePointsMade =
                state.teamGuest.threePointsMade + 1;
              state.teamGuest.threePointsAll =
                state.teamGuest.threePointsAll + 1;
              state.teamGuest.allShotsMade = state.teamGuest.allShotsMade + 1;
              state.teamGuest.allShots = state.teamGuest.allShots + 1;
              state.teamGuest.points = state.teamGuest.points + 3;
            }
          }
        }

        if (type === "cross") {
          if (cost === TWO_POINTS_ZONE) {
            player.twoPointsAll = player.twoPointsAll + 1;
            player.allShots = player.allShots + 1;

            if (player.isHomePlayer) {
              state.teamHome.twoPointsAll = state.teamHome.twoPointsAll + 1;
              state.teamHome.allShots = state.teamHome.allShots + 1;
            } else {
              state.teamGuest.twoPointsAll = state.teamGuest.twoPointsAll + 1;
              state.teamGuest.allShots = state.teamGuest.allShots + 1;
            }
          }

          if (cost === THREE_POINTS_ZONE) {
            player.threePointsAll = player.threePointsAll + 1;
            player.allShots = player.allShots + 1;

            if (player.isHomePlayer) {
              state.teamHome.threePointsAll = state.teamHome.threePointsAll + 1;
              state.teamHome.allShots = state.teamHome.allShots + 1;
            } else {
              state.teamGuest.threePointsAll = state.teamGuest.twoPointsAll + 1;
              state.teamGuest.allShots = state.teamGuest.allShots + 1;
            }
          }
        }
      }
    },

    removeLastMarkerFromPlayer: (state, action) => {
      const { id: playerId } = action.payload;

      const player = [
        ...state.teamHome.players,
        ...state.teamGuest.players,
      ].find((p) => p.id === playerId);
      if (player && player.markers?.length) {
        const lastMarker = player.markers[player.markers.length - 1];
        const { cost, type } = lastMarker;

        if (type === "circle") {
          if (cost === TWO_POINTS_ZONE) {
            player.twoPointsMade = player.twoPointsMade - 1;
            player.twoPointsAll = player.twoPointsAll - 1;
            player.allShotsMade = player.allShotsMade - 1;
            player.allShots = player.allShots - 1;
            player.points = player.points - 2;

            if (player && player.isHomePlayer) {
              state.teamHome.twoPointsMade = state.teamHome.twoPointsMade - 1;
              state.teamHome.twoPointsAll = state.teamHome.twoPointsAll - 1;
              state.teamHome.allShotsMade = state.teamHome.allShotsMade - 1;
              state.teamHome.allShots = state.teamHome.allShots - 1;
              state.teamHome.allShots = state.teamHome.allShots - 1;
              state.teamHome.points = state.teamHome.points - 2;
            }

            if (player && !player.isHomePlayer) {
              state.teamGuest.twoPointsMade = state.teamGuest.twoPointsMade - 1;
              state.teamGuest.twoPointsAll = state.teamGuest.twoPointsAll - 1;
              state.teamGuest.allShotsMade = state.teamGuest.allShotsMade - 1;
              state.teamGuest.allShots = state.teamGuest.allShots - 1;
              state.teamGuest.points = state.teamGuest.points - 2;
            }
          }

          if (cost === THREE_POINTS_ZONE) {
            player.threePointsMade = player.threePointsMade - 1;
            player.threePointsAll = player.threePointsAll - 1;
            player.allShotsMade = player.allShotsMade - 1;
            player.allShots = player.allShots - 1;
            player.points = player.points - 3;

            if (player && player.isHomePlayer) {
              state.teamHome.threePointsMade =
                state.teamHome.threePointsMade - 1;
              state.teamHome.threePointsAll = state.teamHome.threePointsAll - 1;
              state.teamHome.allShotsMade = state.teamHome.allShotsMade - 1;
              state.teamHome.allShots = state.teamHome.allShots - 1;
              state.teamHome.points = state.teamHome.points - 3;
            }

            if (player && !player.isHomePlayer) {
              state.teamGuest.threePointsMade =
                state.teamGuest.threePointsMade - 1;
              state.teamGuest.threePointsAll =
                state.teamGuest.threePointsAll - 1;
              state.teamGuest.allShotsMade = state.teamGuest.allShotsMade - 1;
              state.teamGuest.allShots = state.teamGuest.allShots - 1;
              state.teamGuest.points = state.teamGuest.points - 3;
            }
          }
        }

        if (type === "cross") {
          if (cost === TWO_POINTS_ZONE) {
            player.twoPointsAll = player.twoPointsAll - 1;
            player.allShots = player.allShots - 1;

            if (player && player.isHomePlayer) {
              state.teamHome.twoPointsAll = state.teamHome.twoPointsAll - 1;
              state.teamHome.allShots = state.teamHome.allShots - 1;
            }

            if (player && player.isHomePlayer) {
              state.teamGuest.twoPointsAll = state.teamGuest.twoPointsAll - 1;
              state.teamGuest.allShots = state.teamGuest.allShots - 1;
            }
          }

          if (cost === THREE_POINTS_ZONE) {
            player.threePointsAll = player.threePointsAll - 1;
            player.allShots = player.allShots - 1;

            if (player && player.isHomePlayer) {
              state.teamHome.threePointsAll = state.teamHome.threePointsAll - 1;
              state.teamHome.allShots = state.teamHome.allShots - 1;
            }

            if (player && !player.isHomePlayer) {
              state.teamGuest.threePointsAll =
                state.teamGuest.threePointsAll - 1;
              state.teamGuest.allShots = state.teamGuest.allShots - 1;
            }
          }
        }

        player.markers?.pop();
      }
    },

    addMakeFreeThrowToPlayer: (state, action) => {
      const { id: playerId } = action.payload;
      const player = [
        ...state.teamHome.players,
        ...state.teamGuest.players,
      ].find((p) => p.id === playerId);

      if (player) {
        player.freeThrowMade = player.freeThrowMade + 1;
        player.freeThrowAll = player.freeThrowAll + 1;
        player.points = player.points + 1;
      }
    },

    removeMakeFreeThrowToPlayer: (state, action) => {
      const { id: playerId } = action.payload;

      const player = [
        ...state.teamHome.players,
        ...state.teamGuest.players,
      ].find((p) => p.id === playerId);

      if (player) {
        player.freeThrowMade = player.freeThrowMade - 1;
        player.freeThrowAll = player.freeThrowAll - 1;
        player.points = player.points - 1;
      }
    },

    addMakeFreeThrowToTeam: (state, action) => {
      const player = action.payload;

      if (player && player.isHomePlayer) {
        state.teamHome.freeThrowMade = state.teamHome.freeThrowMade + 1;
        state.teamHome.freeThrowAll = state.teamHome.freeThrowAll + 1;
        state.teamHome.points = state.teamHome.points + 1;
      }

      if (player && !player.isHomePlayer) {
        state.teamGuest.freeThrowMade = state.teamGuest.freeThrowMade + 1;
        state.teamGuest.freeThrowAll = state.teamGuest.freeThrowAll + 1;
        state.teamGuest.points = state.teamGuest.points + 1;
      }
    },

    removeMakeFreeThrowToTeam: (state, action) => {
      const player = action.payload;

      if (player && player.isHomePlayer) {
        state.teamHome.freeThrowMade = state.teamHome.freeThrowMade - 1;
        state.teamHome.freeThrowAll = state.teamHome.freeThrowAll - 1;
        state.teamHome.points = state.teamHome.points - 1;
      }

      if (player && !player.isHomePlayer) {
        state.teamGuest.freeThrowMade = state.teamGuest.freeThrowMade - 1;
        state.teamGuest.freeThrowAll = state.teamGuest.freeThrowAll - 1;
        state.teamGuest.points = state.teamGuest.points - 1;
      }
    },

    addMissFreeThrowToPlayer: (state, action) => {
      const { id: playerId } = action.payload;

      const player = [
        ...state.teamHome.players,
        ...state.teamGuest.players,
      ].find((p) => p.id === playerId);

      if (player) {
        player.freeThrowAll = player.freeThrowAll + 1;
      }
    },

    removeMissFreeThrowToPlayer: (state, action) => {
      const { id: playerId } = action.payload;

      const player = [
        ...state.teamHome.players,
        ...state.teamGuest.players,
      ].find((p) => p.id === playerId);

      if (player) {
        player.freeThrowAll = player.freeThrowAll - 1;
      }
    },

    addMissFreeThrowToTeam: (state, action) => {
      const player = action.payload;

      if (player && player.isHomePlayer) {
        state.teamHome.freeThrowAll = state.teamHome.freeThrowAll + 1;
      }

      if (player && !player.isHomePlayer) {
        state.teamGuest.freeThrowAll = state.teamGuest.freeThrowAll + 1;
      }
    },

    removeMissFreeThrowToTeam: (state, action) => {
      const player = action.payload;

      if (player && player.isHomePlayer) {
        state.teamHome.freeThrowAll = state.teamHome.freeThrowAll - 1;
      }

      if (player && !player.isHomePlayer) {
        state.teamGuest.freeThrowAll = state.teamGuest.freeThrowAll - 1;
      }
    },
  },
});

// Экспортируем экшены
export const {
  addHomeTeamPlayer,
  addGuestTeamPlayer,
  clearHomeTeamPlayers,
  clearGuestTeamPlayers,
  clearHomeTeam,
  clearGuestTeam,
  changeTeamsSide,
  addMarkerToPlayer,
  removeLastMarkerFromPlayer,
  addMakeFreeThrowToPlayer,
  addMakeFreeThrowToTeam,
  addMissFreeThrowToPlayer,
  addMissFreeThrowToTeam,
  setActiveHomeTeam,
  setActiveGuestTeam,
  addHomeTeamName,
  addGuestTeamName,
  removeMissFreeThrowToTeam,
  removeMissFreeThrowToPlayer,
  removeMakeFreeThrowToTeam,
  removeMakeFreeThrowToPlayer,
  removePlayer,
} = teamsSlice.actions;

// Экспортируем редюсер
export const teamsSliceReducer = teamsSlice.reducer;
