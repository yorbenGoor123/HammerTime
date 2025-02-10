import classNames from "classnames";
import styles from "./Mole.module.css";
import { whackMole } from "../../../Slices/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { RootState } from "../../../Slices/GameStore";

interface Props {
  index: number;
}

const Mole: React.FC<Props> = memo(({ index }) => {
  const dispatch = useDispatch();
  const isUp = useSelector((state: RootState) => state.game.moles[index]);

  return (
    <div
      data-testid="mole"
      onClick={() => isUp && dispatch(whackMole(index))}
      className={classNames(
        styles.mole,
        isUp ? styles.ready_to_wack : styles.sneaky
      )}
    >
    </div>
  );
});

export default Mole;
