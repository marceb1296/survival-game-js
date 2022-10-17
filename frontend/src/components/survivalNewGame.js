import { useRef } from "react";
import "../css/survivalGameOver.scss";

const SurvivalNewGame = ({load, dispatch}) => {
    
    const animation = useRef();
    const gameLoaded = localStorage.getItem("survival_game");
    console.log("local: " + gameLoaded)
    
    const newGame = async (e) => {
        animation.current.classList.toggle("fadeOut");
        await new Promise(r => setTimeout(r, 2000));
        dispatch({
            type: "START GAME"
        });
    }
    const loadGame = async (e) => {
        dispatch({
            type: "LOAD GAME"
        });
        animation.current.classList.toggle("fadeOut");
        await new Promise(r => setTimeout(r, 2000));
        dispatch({
            type: "START GAME"
        });
    }
    return (
        <div ref={animation} className="survival-new-game">
            <button onClick={newGame}>New Game</button>
            { gameLoaded !== null && gameLoaded.load &&
                <button onClick={loadGame}>Load Game</button>
            }
        </div>
    )
}

export default SurvivalNewGame;