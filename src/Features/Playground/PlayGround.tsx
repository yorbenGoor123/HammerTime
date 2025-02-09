import { useCallback, useEffect } from "react";
import Mole from "./Mole/Mole";
import styles from "./PlayGround.module.css";
import { hideMole, spawnMole, tickTimer } from "../../Slices/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Slices/GameStore";
import MoleContainer from "./Mole/MoleContainer";

const Playground: React.FC = () => {
    const gameActive = useSelector((state: RootState) => state.game.gameActive);
    const intervalSpeed = useSelector((state: RootState) => state.game.intervalSpeed);

    const dispatch = useDispatch();

    const startGameLoop = useCallback(() => {
        if (!gameActive) return;

        const moleInterval = setInterval(() => {
            dispatch(spawnMole());
            setTimeout(() => {
                dispatch(hideMole(Math.floor(Math.random() * 12))); // Assume 12 holes
            }, 800);
        }, intervalSpeed);

        const gameTimer = setInterval(() => {
            dispatch(tickTimer());
        }, 1000);

        return () => {
            clearInterval(moleInterval);
            clearInterval(gameTimer);
        };
    }, [gameActive, dispatch, intervalSpeed]);

    useEffect(() => {
        return startGameLoop();
    }, [startGameLoop]);

    return (
        <div className={styles.playground}>
            {[...Array(12)].map((_, index) => (
                <MoleContainer key={index} index={index} />
            ))}
        </div>
    );
};

export default Playground;