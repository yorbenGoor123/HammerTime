import { useCallback, useEffect } from "react";
import styles from "./PlayGround.module.css";
import { hideMole, spawnMole, tickTimer } from "../../Slices/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Slices/GameStore";
import { numberOfHoles } from "../../contants";
import Mole from "./Mole/Mole";

const Playground: React.FC = () => {
    const gameActive = useSelector((state: RootState) => state.game.gameActive);
    const intervalSpeed = useSelector((state: RootState) => state.game.intervalSpeed);

    const dispatch = useDispatch();

    const startGameLoop = useCallback(() => {
        if (!gameActive) return;

        const moleInterval = setInterval(() => {
            dispatch(spawnMole());
            setTimeout(() => {
                dispatch(hideMole(Math.floor(Math.random() * numberOfHoles)));
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
        <div role="playground" className={styles.playground}>
            {[...Array(numberOfHoles)].map((_, index) => (
                <Mole key={index} index={index} />
            ))}
        </div>
    );
};

export default Playground;