import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { numberOfHoles } from "../contants";

export interface GameState {
  score: number;
  moles: boolean[];
  intervalSpeed: number;
  gameTime: number;
  gameActive: boolean;
  playerName: string;
}

const initialState: GameState = {
  score: 0,
  moles: Array(numberOfHoles).fill(false),
  intervalSpeed: 1500,
  gameTime: 120,
  gameActive: false,
  playerName: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<string>) => {
      state.gameActive = true;
      state.score = 0;
      state.intervalSpeed = 1500;
      state.gameTime = 120;
      state.playerName = action.payload; // ✅ PlayerName correct instellen
      state.moles = Array(numberOfHoles).fill(false); // ✅ Moles opnieuw initialiseren
    },
    whackMole: (state, action: PayloadAction<number>) => {
      if (state.moles[action.payload]) {
        state.score += 1;
        state.moles[action.payload] = false;
        state.intervalSpeed = Math.max(400, 1500 - Math.floor(state.score / 5) * 100);
      }
    },
    spawnMole: (state) => {
      const randomIndex = Math.floor(Math.random() * state.moles.length);
      state.moles[randomIndex] = true;
    },
    hideMole: (state, action: PayloadAction<number>) => {
      state.moles[action.payload] = false;
    },
    tickTimer: (state) => {
        if (state.gameTime > 1) {
          state.gameTime -= 1;
        } else {
          state.gameTime = 0;
          state.gameActive = false;
          state.moles = Array(numberOfHoles).fill(false);
        }
      },
  },
});

export const { startGame, whackMole, spawnMole, hideMole, tickTimer } = gameSlice.actions;
export default gameSlice.reducer;
