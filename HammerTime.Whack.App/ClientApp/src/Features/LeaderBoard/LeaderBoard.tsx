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