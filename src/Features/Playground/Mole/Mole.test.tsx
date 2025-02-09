import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Mole from "./Mole";
import { whackMole } from "../../../Slices/GameSlice";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from '../../../Slices/GameSlice'
import { RootState } from "../../../Slices/GameStore";

const rootReducer = combineReducers({
    game: gameReducer
  })
  export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
      reducer: rootReducer,
      preloadedState
    })
  }

describe("Mole Component", () => {
    let store: any

    beforeEach(() => {
        store = setupStore({});
        store.dispatch = vi.fn(); // Mock dispatch function
    });

    test("renders Mole component", () => {
        render(
            <Provider store={store}>
                <Mole index={1} />
            </Provider>
        );
        expect(screen.getByTestId("mole")).toBeInTheDocument();
    });

    test("applies correct class when readyToBeWacked is true", () => {
        render(
            <Provider store={store}>
                <Mole index={1} readyToBeWacked={true} />
            </Provider>
        );
        expect(screen.getByTestId("mole")).toContainHTML("ready_to_wack");
    });

    test("applies correct class when readyToBeWacked is false", () => {
        render(
            <Provider store={store}>
                <Mole index={1} readyToBeWacked={false} />
            </Provider>
        );
        expect(screen.getByTestId("mole")).toContainHTML("sneaky");
    });

    test("dispatches whackMole action when clicked and readyToBeWacked is true", () => {
        render(
            <Provider store={store}>
                <Mole index={1} readyToBeWacked={true} />
            </Provider>
        );
        fireEvent.click(screen.getByTestId("mole"));
        expect(store.dispatch).toHaveBeenCalledWith(whackMole(1));
    });

    test("does not dispatch whackMole action when clicked and readyToBeWacked is false", () => {
        render(
            <Provider store={store}>
                <Mole index={1} readyToBeWacked={false} />
            </Provider>
        );
        fireEvent.click(screen.getByTestId("mole"));
        expect(store.dispatch).not.toHaveBeenCalled();
    });
});
