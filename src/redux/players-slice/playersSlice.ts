import { createSlice } from "@reduxjs/toolkit";

import type { PlayerSliceState } from "../types";

const initialState: PlayerSliceState = {
  activePlayer: null,
};

const playersSlice = createSlice({
  name: "players", // Имя слайса
  initialState,
  reducers: {
    // Добавление игрока в домашнюю команду
    setActivePlayer: (state, action) => {
      state.activePlayer = action.payload; // Добавляем игрока в массив
    },
  },
});

// Экспортируем экшены
export const { setActivePlayer } = playersSlice.actions;

// Экспортируем редюсер
export const playersSliceReducer = playersSlice.reducer;
