import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Mole from "./Mole";
import { whackMole } from "../../../Slices/GameSlice";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "../../../Slices/GameSlice";
import { RootState } from "../../../Slices/GameStore";

const rootReducer = combineReducers({
  game: gameReducer,
});

function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

describe("Mole Component", () => {
  let index = 0;
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore({
      game: {
        score: 0,
        moles: [false, false, false], // Ensuring the index exists
        intervalSpeed: 1500,
        gameTime: 60,
        gameActive: true,
        playerName: "Player 1",
      },
    });
    store.dispatch = vi.fn();
  });

  test("renders Mole component", () => {
    render(
      <Provider store={store}>
        <Mole index={index} />
      </Provider>
    );

    expect(screen.getByTestId("mole")).toBeInTheDocument();
  });

  test("renders mole in the correct initial state (down)", () => {
    render(
      <Provider store={store}>
        <Mole index={index} />
      </Provider>
    );
    expect(screen.getByTestId("down")).toBeInTheDocument();
  });

  test("renders mole in the up state when Redux state changes", () => {
    store = setupStore({
      game: {
        ...store.getState().game,
        moles: [true], // Mole is up
      },
    });

    render(
      <Provider store={store}>
        <Mole index={index} />
      </Provider>
    );
    expect(screen.getByTestId("up")).toBeInTheDocument();
  });

  test("dispatches whackMole action when clicked", () => {
    render(
      <Provider store={store}>
        <Mole index={index} />
      </Provider>
    );

    const moleElement = screen.getByTestId("down");
    fireEvent.mouseDown(moleElement);

    expect(store.dispatch).toHaveBeenCalledWith(whackMole(index));
  });

  test("adds whacked class on mousedown and removes it on mouseup", () => {
    render(
      <Provider store={store}>
        <Mole index={index} />
      </Provider>
    );

    const moleElement = screen.getByTestId("down");
    fireEvent.mouseDown(moleElement);
    expect(moleElement).toContainHTML("whack");

    fireEvent.mouseUp(moleElement);
    expect(moleElement).not.toContainHTML("whack");
  });
});
