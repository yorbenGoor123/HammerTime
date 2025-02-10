import classNames from "classnames";
import styles from "./Mole.module.css";
import { whackMole } from "../../../Slices/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { memo, useState } from "react";
import { RootState } from "../../../Slices/GameStore";

interface Props {
  index: number;
}

const Mole: React.FC<Props> = memo(({ index }) => {
  const [whacked, setWhacked] = useState(false);
  const dispatch = useDispatch();
  const isUp = useSelector((state: RootState) => state.game.moles[index]);

  const handleWhack = () => {
    dispatch(whackMole(index));
    setWhacked(true);
  };

  const handleMouseUp = () => {
    setWhacked(false);
  };

  return (
    <div
      data-testid={`${isUp ? "up" : "down"}`}
      onMouseDown={handleWhack}
      onMouseUp={handleMouseUp}
      className={classNames(
        styles.mole,
        isUp ? styles.ready_to_wack : styles.sneaky,
        whacked && styles.whack
      )}
    ></div>
  );
});

export default Mole;
