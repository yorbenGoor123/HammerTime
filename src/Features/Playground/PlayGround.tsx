import { useEffect } from 'react';
import Mole from './Mole/Mole';
import styles from './PlayGround.module.css'
import { hideMole, spawnMole, tickTimer } from '../../Slices/GameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Slices/GameStore';
import { v4 as uuidv4 } from 'uuid';

const Playground: React.FC = () => {

    const { moles, gameActive, intervalSpeed } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!gameActive) return;

        const moleInterval = setInterval(() => {
            dispatch(spawnMole());
            setTimeout(() => {
                dispatch(hideMole(Math.floor(Math.random() * moles.length)));
            }, 800);
        }, intervalSpeed);

        const gameTimer = setInterval(() => {
            dispatch(tickTimer());
        }, 1000);

        return () => {
            clearInterval(moleInterval);
            clearInterval(gameTimer);
        };
    }, [gameActive, dispatch, intervalSpeed, moles.length]);


    return (
        <div className={styles.playground}>
            {moles.map((isUp: boolean, index: number) => (
                <Mole index={index} key={uuidv4()} readyToBeWacked={isUp} />
            ))}
        </div>
    );
};

export default Playground;