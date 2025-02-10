import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import Leaderboard from "./LeaderBoard";
import { store } from "../../Slices/GameStore";
import { fetchLeaderboard } from "../../Requests/leaderboard-requests";


vi.mock("../../Requests/leaderboard-requests");

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
        </Provider>
    );
};

describe("Leaderboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
              matches: false,
              media: query,
              onchange: null,
              addListener: vi.fn(),
              removeListener: vi.fn(),
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
              dispatchEvent: vi.fn(),
            })),
          });
    });

    it("renders leaderboard correctly", async () => {
        (fetchLeaderboard as Mock).mockResolvedValue([
            { name: "Player1", score: 100 },
            { name: "Player2", score: 200 },
        ]);

        renderWithProviders(<Leaderboard />);

        expect(screen.getByText("You will play as")).to.exist;
        await waitFor(() => expect(screen.getByText("Player1")).to.exist);
        expect(screen.getByText("Player2")).to.exist;
    });

    it("starts game with entered player name", async () => {
        renderWithProviders(<Leaderboard />);

        fireEvent.change(screen.getByLabelText("You will play as"), {
            target: { value: "NewPlayer" },
        });
        fireEvent.click(screen.getByText("Start Game"));

        await waitFor(() => {
            expect(store.getState().game.playerName).toBe("NewPlayer");
            expect(store.getState().game.gameActive).toBe(true);
        });
    });
});