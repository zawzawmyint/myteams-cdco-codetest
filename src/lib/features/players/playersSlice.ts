import { Player } from "@/utils/definitations/definitations";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PlayersState {
  players: Player[];
}

// Helper functions for localStorage
const PLAYERS_STORAGE_KEY = "players";

const loadPlayersFromStorage = (): Player[] => {
  if (typeof window === "undefined") return []; // SSR check

  try {
    const stored = localStorage.getItem(PLAYERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading players from localStorage:", error);
    return [];
  }
};

const savePlayersToStorage = (players: Player[]) => {
  if (typeof window === "undefined") return; // SSR check

  try {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
  } catch (error) {
    console.error("Error saving players to localStorage:", error);
  }
};

// Define the initial state using that type
const initialState: PlayersState = {
  players: loadPlayersFromStorage(), // Load from localStorage on initialization
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
      savePlayersToStorage(state.players);
    },

    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      if (index !== -1) {
        state.players[index] = action.payload;
        savePlayersToStorage(state.players);
      }
    },

    // Action to manually load players from storage (useful for hydration)
    loadPlayersFromStorageRedu: (state) => {
      state.players = loadPlayersFromStorage();
    },
  },
});

export const { setPlayers, updatePlayer, loadPlayersFromStorageRedu } =
  playersSlice.actions;

export default playersSlice.reducer;
