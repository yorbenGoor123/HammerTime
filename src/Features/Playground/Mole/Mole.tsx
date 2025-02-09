import classNames from "classnames";
import styles from "./Mole.module.css"
import { whackMole } from "../../../Slices/GameSlice";
import { useDispatch } from "react-redux";

interface Props {
    readyToBeWacked?: boolean;
    index: number;
}

const Mole: React.FC<Props> = ({ readyToBeWacked = false, index }) => {
    const dispatch = useDispatch();

    return <div data-testid="mole" onClick={() => readyToBeWacked && dispatch(whackMole(index))} className={classNames(styles.mole, readyToBeWacked ? styles.ready_to_wack : styles.sneaky)}></div>
}

export default Mole;