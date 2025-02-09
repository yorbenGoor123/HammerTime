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
    game: gameReducer
});

function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}

describe("Mole Component", () => {
    let store: ReturnType<typeof setupStore>;

    beforeEach(() => {
        store = setupStore({
            game: {
                score: 0,
                moles: [false, false, false], // Ensuring the index exists
                intervalSpeed: 1500,
                gameTime: 60,
                gameActive: true,
            },
        });
        store.dispatch = vi.fn();
    });

    test("renders Mole component", () => {
        render(
            <Provider store={store}>
                <Mole index={1} />
            </Provider>
        );

        expect(screen.getByTestId("mole")).toBeInTheDocument();
    });

    test("applies correct class when mole is up", () => {
        store = setupStore({
            game: {
                ...store.getState().game,
                moles: [false, true, false] // Setting index 1 as up
            },
        });

        render(
            <Provider store={store}>
                <Mole index={1} />
            </Provider>
        );

        expect(screen.getByTestId("mole")).toContainHTML("ready_to_wack");
    });

    test("applies correct class when mole is not up", () => {
        render(
            <Provider store={store}>
                <Mole index={1} />
            </Provider>
        );

        expect(screen.getByTestId("mole")).toContainHTML("sneaky");
    });

    test("dispatches whackMole action when clicked and mole is up", () => {
        store = setupStore({
            game: {
                ...store.getState().game,
                moles: [false, true, false] // Index 1 is up
            },
        });
        store.dispatch = vi.fn();

        render(
            <Provider store={store}>
                <Mole index={1} />
            </Provider>
        );

        fireEvent.click(screen.getByTestId("mole"));
        expect(store.dispatch).toHaveBeenCalledWith(whackMole(1));
    });

    test("does not dispatch whackMole action when clicked and mole is not up", () => {
        render(
            <Provider store={store}>
                <Mole index={1} />
            </Provider>
        );

        fireEvent.click(screen.getByTestId("mole"));
        expect(store.dispatch).not.toHaveBeenCalled();
    });
});
