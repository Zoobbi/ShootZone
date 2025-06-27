import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTeamMode: false,
};

const modeSlice = createSlice({
  name: "mode", // Имя слайса
  initialState,
  reducers: {
    setTeamMode: (state) => {
      state.isTeamMode = true;
    },

    resetTeamMode: (state) => {
      state.isTeamMode = false;
    },
  },
});

export const { setTeamMode, resetTeamMode } = modeSlice.actions;

// Экспортируем редюсер
export const modeSliceReducer = modeSlice.reducer;
