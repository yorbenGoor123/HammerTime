import { useSelector } from "react-redux";
import { RootState } from "../../Slices/GameStore";
import styles from "./ScoreBoard.module.css";

const Scoreboard: React.FC = () => {
  const { score, gameTime } = useSelector((state: RootState) => state.game);

  return (
    <div className={styles.scoreboard}>
      <p className="text-2xl font-bold">Score: {score}</p>
      <p className="text-xl font-semibold">Time Left: {gameTime}s</p>
    </div>
  );
};

export default Scoreboard;
