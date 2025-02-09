import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "../../Slices/GameSlice";
import { RootState } from "../../Slices/GameStore";

const Scoreboard: React.FC = () => {
  const { score, gameTime, gameActive } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Whack-a-Mole</h1>
      <p className="text-xl">Score: {score}</p>
      <p className="text-xl">Time Left: {gameTime}s</p>
      {!gameActive && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => dispatch(startGame())}
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default Scoreboard;
