import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./features/players/playersSlice";
import teamsReducer from "./features/teams/teamsSlice";
import loginReducer from "./features/login/loginSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      players: playersReducer,
      teams: teamsReducer,
      login: loginReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
