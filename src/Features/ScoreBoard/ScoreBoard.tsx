import { useSelector } from "react-redux";
import { RootState } from "../../Slices/GameStore";
import styles from './ScoreBoard.module.css'

const Scoreboard: React.FC = () => {
  const { score, gameTime } = useSelector((state: RootState) => state.game);

  return (
    <div className={styles.scoreboard}>
      <p className="text-2xl font-bold">
        Score: <span className="text-yellow-400">{score}</span>
      </p>
      <p
        className={`text-xl font-semibold ${
          gameTime <= 60 ? "text-red-500 animate-pulse" : "text-green-400"
        }`}
      >
        Time Left: {gameTime}s
      </p>
    </div>
  );
};

export default Scoreboard;
