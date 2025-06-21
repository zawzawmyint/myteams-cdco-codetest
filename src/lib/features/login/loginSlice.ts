import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define the shape of the login state
interface LoginState {
  name: string;
  isAuthenticated: boolean;
}

// Helper functions for localStorage
const LOGIN_STORAGE_KEY = "loginState";

const loadLoginFromStorage = (): LoginState => {
  if (typeof window === "undefined") {
    return { name: "", isAuthenticated: false }; // SSR check
  }

  try {
    const stored = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the structure to ensure it matches LoginState
      if (
        typeof parsed.name === "string" &&
        typeof parsed.isAuthenticated === "boolean"
      ) {
        return parsed;
      }
    }
    return { name: "", isAuthenticated: false };
  } catch (error) {
    console.error("Error loading login state from localStorage:", error);
    return { name: "", isAuthenticated: false };
  }
};

const saveLoginToStorage = (loginState: LoginState) => {
  if (typeof window === "undefined") return; // SSR check

  try {
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(loginState));
  } catch (error) {
    console.error("Error saving login state to localStorage:", error);
  }
};

const clearLoginFromStorage = () => {
  if (typeof window === "undefined") return; // SSR check

  try {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing login state from localStorage:", error);
  }
};

// Initial state - load from localStorage
const initialState: LoginState = loadLoginFromStorage();

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // Action to set the user's name and mark as authenticated
    login: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isAuthenticated = true;

      // Save to localStorage
      saveLoginToStorage({
        name: state.name,
        isAuthenticated: state.isAuthenticated,
      });
    },

    // Action to clear the user's name and mark as not authenticated
    logout: (state) => {
      state.name = "";
      state.isAuthenticated = false;

      // Clear from localStorage
      clearLoginFromStorage();
    },

    // Action to manually load login state from storage (useful for hydration)
    loadLoginFromStorageRedu: (state) => {
      const storedState = loadLoginFromStorage();
      state.name = storedState.name;
      state.isAuthenticated = storedState.isAuthenticated;
    },
  },
});

// Export actions
export const { login, logout, loadLoginFromStorageRedu } = loginSlice.actions;

// Export the reducer
export default loginSlice.reducer;
