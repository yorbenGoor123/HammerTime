import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer, { startGame } from "../../Slices/GameSlice";
import { RootState } from "../../Slices/GameStore";
import Scoreboard from "./ScoreBoard";

const rootReducer = combineReducers({
    game: gameReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

describe("Scoreboard Component", () => {
    let store: any;

    beforeEach(() => {
        store = setupStore({
            game: {
                score: 0,
                moles: Array(9).fill(false),
                intervalSpeed: 1500,
                gameTime: 60,
                gameActive: false,
            },
        });
        store.dispatch = vi.fn(); // Mock dispatch function
    });

    test("renders Scoreboard component correctly", () => {
        render(
            <Provider store={store}>
                <Scoreboard />
            </Provider>
        );
        expect(screen.getByText("Whack-a-Mole")).toBeInTheDocument();
        expect(screen.getByText(/Score:/)).toBeInTheDocument();
        expect(screen.getByText(/Time Left:/)).toBeInTheDocument();
    });

    test("displays correct score and time", () => {
        render(
            <Provider store={store}>
                <Scoreboard />
            </Provider>
        );
        expect(screen.getByText("Score: 0")).toBeInTheDocument();
        expect(screen.getByText("Time Left: 60s")).toBeInTheDocument();
    });

    test("renders start button when game is not active", () => {
        render(
            <Provider store={store}>
                <Scoreboard />
            </Provider>
        );
        expect(screen.getByText("Start Game")).toBeInTheDocument();
    });

    test("does not render start button when game is active", () => {
        store = setupStore({
            game: {
                score: 10,
                moles: Array(9).fill(false),
                intervalSpeed: 1500,
                gameTime: 30,
                gameActive: false,
            },
        });

        render(
            <Provider store={store}>
                <Scoreboard />
            </Provider>
        );

        // start the game
        fireEvent.click(screen.getByText("Start Game"));

        expect(screen.queryByText("Start Game")).not.toBeInTheDocument();
    });

    test("dispatches startGame action when start button is clicked", () => {
        render(
            <Provider store={store}>
                <Scoreboard />
            </Provider>
        );
        fireEvent.click(screen.getByText("Start Game"));
        expect(store.dispatch).toHaveBeenCalledWith(startGame());
    });
});
