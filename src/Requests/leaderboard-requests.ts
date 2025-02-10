import axios from "axios";

export interface Player {
  id?: number;
  name: string;
  score: number;
}

export type LeaderboardResponse = Player[];

export const fetchLeaderboard = async (): Promise<LeaderboardResponse> => {
  try {
    const response = await axios.get<LeaderboardResponse>(
      `${import.meta.env.VITE_URL}/leaderboard`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch leaderboard");
  }
};

/** Add or Update a Player's Score */
export const addUpdatePlayer = async (player: Player): Promise<Player> => {
  try {
    // Fetch leaderboard and check if player already exists
    const leaderboard = await fetchLeaderboard();
    const existingPlayer = leaderboard.find((p) => p.name === player.name);

    if (existingPlayer) {
      // Update score instead of creating a new player
      const updatedPlayer: Player = {
        ...existingPlayer,
        score: existingPlayer.score > player.score ? existingPlayer.score : player.score, // Update score if higher
      };

      const response = await axios.put<Player>(
        `${import.meta.env.VITE_URL}/leaderboard/${existingPlayer.id}`,
        updatedPlayer
      );

      return response.data;
    } else {
      // Create new player if not found
      const response = await axios.post<Player>(
        `${import.meta.env.VITE_URL}/leaderboard`,
        player
      );
      return response.data;
    }
  } catch (error) {
    throw new Error("Failed to add or update player");
  }
};
