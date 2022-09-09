import "../css/survivalGameApp.scss";
import "../css/survivalGameCenter.scss";
import SurvivalGameLeft from "../components/survivalGameLeft";
import SurvivalGameRight from "./survivalGameRight";

const SurvivalGame = () => {
    return (
        <div className="survival-container">
            <SurvivalGameLeft />
            <div className="survival-center"></div>
            <SurvivalGameRight />
        </div>
    );
}
 
export default SurvivalGame;