
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test } from "vitest";
import Playground from "./PlayGround";
import "@testing-library/jest-dom";
import { RootState } from "../../Slices/GameStore";
import { numberOfHoles } from "../../contants";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "../../Slices/GameSlice";

const rootReducer = combineReducers({
    game: gameReducer,
});

function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

describe("Playground Component", () => {
    let store: ReturnType<typeof setupStore>;

    beforeEach(() => {
        store = setupStore({
            game: {
                gameActive: true,
                intervalSpeed: 1000,
                score: 0,
                moles: Array(numberOfHoles).fill(false),
                gameTime: 60,
                playerName: "Player 1",
            },
        });
    });

    test("renders Playground component", () => {
        render(
            <Provider store={store}>
                <Playground />
            </Provider>
        );

        const playgroundElement = screen.getByRole("playground");
        expect(playgroundElement).toBeInTheDocument();
    });

    test("renders correct number of Mole components", () => {
        render(
            <Provider store={store}>
                <Playground />
            </Provider>
        );

        const moleElements = screen.getAllByRole("mole");
        expect(moleElements).toHaveLength(numberOfHoles);
    });

    // Add more tests as needed
});