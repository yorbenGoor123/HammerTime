import { useSelector } from "react-redux";
import { RootState } from "../../../Slices/GameStore";
import Mole from "./Mole";


interface MoleContainerProps {
    index: number;
}

const MoleContainer: React.FC<MoleContainerProps> = ({ index }) => {
    const isUp = useSelector((state: RootState) => state.game.moles[index]); // Select individual mole so no rerenders can occur at the parent

    return <Mole index={index} readyToBeWacked={isUp} />;
};

export default MoleContainer;