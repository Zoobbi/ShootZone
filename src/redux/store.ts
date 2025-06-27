import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { modeSliceReducer } from "@app/redux/mode-slice"; // localStorage
import { playersSliceReducer } from "@app/redux/players-slice";
import { teamsSliceReducer } from "@app/redux/teams-slice";

// Конфигурация redux-persist
const persistConfig = {
  key: "root", // Ключ для сохранения данных в localStorage
  storage, // Используем localStorage
  whitelist: ["teams"], // Сохраняем только состояние teams
};

// Комбинируем редюсеры
const rootReducer = combineReducers({
  teams: teamsSliceReducer,
  players: playersSliceReducer,
  mode: modeSliceReducer,
});

// Создаем persist-редюсер
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку сериализации для redux-persist
    }),
});

export const persistor = persistStore(store);
