import { Player, Team } from "@/utils/definitations/definitations";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TeamsState {
  teams: Team[];
}

// Helper functions for localStorage
const TEAMS_STORAGE_KEY = "teams";

const loadTeamsFromStorage = (): Team[] => {
  if (typeof window === "undefined") return []; // SSR check

  try {
    const stored = localStorage.getItem(TEAMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading teams from localStorage:", error);
    return [];
  }
};

const saveTeamsToStorage = (teams: Team[]) => {
  if (typeof window === "undefined") return; // SSR check

  try {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
  } catch (error) {
    console.error("Error saving teams to localStorage:", error);
  }
};

// Define the initial state using that type
const initialState: TeamsState = {
  teams: loadTeamsFromStorage(), // Load from localStorage on initialization
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
      saveTeamsToStorage(state.teams);
    },
    addTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
      saveTeamsToStorage(state.teams);
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      const index = state.teams.findIndex(
        (team) => team.id === action.payload.id
      );
      if (index !== -1) {
        state.teams[index] = action.payload;
        saveTeamsToStorage(state.teams);
      }
    },
    removeTeam: (state, action: PayloadAction<string | number>) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
      saveTeamsToStorage(state.teams);
    },
    addPlayerToTeam: (
      state,
      action: PayloadAction<{ teamId: string | number; player: Player }>
    ) => {
      const { teamId, player } = action.payload;
      const team = state.teams.find((team) => team.id === teamId);
      if (team && team.players) {
        team.players.push(player);
        team.playerCount = team.playerCount + 1;
        saveTeamsToStorage(state.teams);
      }
    },
    removePlayerFromTeam: (
      state,
      action: PayloadAction<{
        teamId: string | number;
        playerId: string | number;
      }>
    ) => {
      const { teamId, playerId } = action.payload;
      const team = state.teams.find((team) => team.id === teamId);
      if (team && team.players) {
        team.players = team.players.filter((player) => player.id !== playerId);
        team.playerCount = team.playerCount - 1;
        saveTeamsToStorage(state.teams);
      }
    },
    // Action to manually load teams from storage (useful for hydration)
    loadTeamsFromStorageRedu: (state) => {
      state.teams = loadTeamsFromStorage();
    },
  },
});

export const {
  setTeams,
  addTeam,
  removeTeam,
  updateTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
  loadTeamsFromStorageRedu,
} = teamsSlice.actions;

export default teamsSlice.reducer;
