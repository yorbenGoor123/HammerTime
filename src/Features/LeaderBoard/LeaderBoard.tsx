import styles from "./LeaderBoard.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Slices/GameStore";
import { startGame } from "../../Slices/GameSlice";
import { useEffect, useState } from "react";
import {
  addUpdatePlayer,
  fetchLeaderboard,
  Player,
} from "../../Requests/leaderboard-requests";

const Leaderboard: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 300000,
  });

  const queryClient = useQueryClient();
  const { gameActive, score } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState("");

  const mutation = useMutation({
    mutationFn: addUpdatePlayer,
    onSuccess: async() => {
      queryClient.refetchQueries({ queryKey: ["leaderboard"] });
    },
  });

  useEffect(() => {
    const sendScore = async () => {
      if (!gameActive && playerName) {
        await mutation.mutateAsync({ name: playerName, score });
      }
    };

    sendScore();
  }, [gameActive]);

  return (
    !gameActive && (
      <div className={styles.leaderboard}>
        <input
          required
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border p-2 rounded-md"
        />
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.slice()
              .sort((a: Player, b: Player) => b.score - a.score)
              .map((player: Player, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={() => dispatch(startGame())}
        >
          Start Game
        </button>
      </div>
    )
  );
};

export default Leaderboard;
