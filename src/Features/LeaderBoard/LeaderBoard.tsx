import styles from "./LeaderBoard.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Player {
  name: string;
  score: number;
}

const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/leaderboard`);
      return response.data; // Axios returns `data` directly, no need for `.json()`
    } catch (error) {
      throw new Error("Failed to fetch leaderboard");
    }
  };

const Leaderboard: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 300000, // 5 minutes
  });

  return (
    <div className={styles.leaderboard}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((player: Player, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
