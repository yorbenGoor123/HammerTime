import gameReducer, { startGame, whackMole, spawnMole, hideMole, tickTimer } from "./GameSlice";
import { GameState } from "./GameSlice"; // Import type
import { describe, it, expect, beforeEach } from 'vitest';

describe("gameSlice", () => {
  let initialState: GameState;

  beforeEach(() => {
    initialState = {
      score: 0,
      moles: Array(9).fill(false),
      intervalSpeed: 1500,
      gameTime: 120,
      gameActive: false,
    };
  });

  it("should handle startGame", () => {
    const newState = gameReducer(initialState, startGame());
    expect(newState).toEqual({
      score: 0,
      moles: Array(9).fill(false),
      intervalSpeed: 1500,
      gameTime: 120,
      gameActive: true,
    });
  });

  it("should handle whackMole when mole is active and make the game harder with increments of 5 points", () => {
    const state: GameState = {
      ...initialState,
      score: 5,
      moles: [true, false, false, false, false, false, false, false, false], // First mole is up
    };

    const newState = gameReducer(state, whackMole(0));
    expect(newState.score).toBe(6);
    expect(newState.moles[0]).toBe(false);
    expect(newState.intervalSpeed).toBeLessThan(1500);
  });

  it("should not increase score when whacking an inactive mole", () => {
    const state = {
      ...initialState,
      moles: [false, false, false, false, false, false, false, false, false], // No mole is up
    };

    const newState = gameReducer(state, whackMole(0));
    expect(newState.score).toBe(0);
    expect(newState.moles[0]).toBe(false);
  });

  it("should spawn a mole in a random position", () => {
    const newState = gameReducer(initialState, spawnMole());
    expect(newState.moles.some((mole) => mole === true)).toBe(true);
  });

  it("should hide a mole at a specific index", () => {
    const state = {
      ...initialState,
      moles: [true, false, false, false, false, false, false, false, false], // First mole is up
    };

    const newState = gameReducer(state, hideMole(0));
    expect(newState.moles[0]).toBe(false);
  });

  it("should decrease gameTime when tickTimer is dispatched", () => {
    const newState = gameReducer(initialState, tickTimer());
    expect(newState.gameTime).toBe(119);
  });

  it("should end the game when gameTime reaches 0", () => {
    const state = { ...initialState, gameTime: 1, gameActive: true };
    const newState = gameReducer(state, tickTimer());
    expect(newState.gameTime).toBe(0);
    expect(newState.gameActive).toBe(false);
  });
});
