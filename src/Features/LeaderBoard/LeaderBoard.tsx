import { useEffect, useState } from "react";
import styles from "./LeaderBoard.module.css"

interface Player {
    name: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([
        { name: "Alice", score: 95 },
        { name: "Bob", score: 89 },
        { name: "Charlie", score: 92 },
        { name: "David", score: 87 },
        { name: "Eva", score: 99 },
    ]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const apiUrl = import.meta.env.VITE_API_URL;
            
            const response = await fetch(`${apiUrl}/posts`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            
          } catch (err) {
            console.log(err)
            
          } finally {
            
          }
        };
    
        fetchPosts();
      }, []);

    useEffect(() => {
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        setPlayers(sortedPlayers);
    }, [])

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
                    {players.map((player, index) => (
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