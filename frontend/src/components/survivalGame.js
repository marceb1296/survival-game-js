import "../css/survivalGameApp.scss";
import "../css/survivalGameCenter.scss";
import SurvivalGameMenu from "./survivalGameMenu";
import SurvivalGamePlayer from "./survivalGamePlayer";
import SurvivalGameSides from "./survivalGameSides";

const SurvivalGame = ({state, dispatch}) => {
    
    
    return (
        <div className="survival-container">
            <div className="survival-container-layouts">
                <SurvivalGameSides state={state} dispatch={dispatch} side="left" />              
                <div className="survival-center"></div>
                <SurvivalGameSides state={state} dispatch={dispatch} side="right" />
            </div>
            <SurvivalGameMenu state={state} dispatch={dispatch}/>
            <SurvivalGamePlayer state={state}/>
        </div>
    );
}
 
export default SurvivalGame;