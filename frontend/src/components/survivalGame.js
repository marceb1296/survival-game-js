import "../css/survivalGameApp.scss";
import "../css/survivalGameCenter.scss";
import SurvivalGameLeft from "../components/survivalGameLeft";
import SurvivalGameRight from "./survivalGameRight";
import SurvivalGameMenu from "./survivalGameMenu";

const SurvivalGame = ({state, dispatch}) => {
    
    
    return (
        <div className="survival-container">
            <div className="survival-container-layouts">
            
                <SurvivalGameLeft state={state}/>
                <div className="survival-center"></div>
                <SurvivalGameRight state={state}/>
            </div>
            <SurvivalGameMenu state={state} dispatch={dispatch}/>
        </div>
    );
}
 
export default SurvivalGame;