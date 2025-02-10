import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "../../Slices/GameSlice";
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
        
        expect(screen.getByText(/Score:/)).toBeInTheDocument();
        expect(screen.getByText(/Time Left:/)).toBeInTheDocument();
    });

    test("displays correct score and time", () => {
        render(
            <Provider store={store}>
                <Scoreboard />
            </Provider>
        );
        expect(screen.getByText(/Score:/)).toBeInTheDocument();
        expect(screen.getByText(/Time Left:/)).toBeInTheDocument();
    });

});
