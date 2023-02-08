import { useRef, useEffect, useState } from "react";
import "../css/survivalGameNew_Over.scss";
import { language } from "../lan/language";


const SurvivalNewGame = ({state, load, dispatch}) => {
    
    const { survival_game } = language;
    //const language_gotted = survival_game[state.language];
    const [language_gotted, setLanguageGotted] = useState(survival_game[state.language])
    
    // set language
    useEffect(() => {
        setLanguageGotted(survival_game[state.language])
    }, [survival_game, state.language, setLanguageGotted])

    const animation = useRef();
    const gameLoaded = JSON.parse(localStorage.getItem("survival_game"));

    const [es, setEs] = useState(state.language == "es" ? 0 : 1);
    const [en, setEn]= useState(state.language == "en" ? 0 : 1);
    
    const newGame = async (e) => {
        animation.current.classList.toggle("fadeOut");
        await new Promise(r => setTimeout(r, 2000));
        dispatch({
            type: "START GAME",
            payload: {
                game: true
            }
        });
    }
    const loadGame = async (e) => {
        dispatch({
            type: "LOAD GAME"
        });
        animation.current.classList.toggle("fadeOut");
        await new Promise(r => setTimeout(r, 2000));
        dispatch({
            type: "START GAME",
            payload: {
                game: true
            }
        });
    }

    const setLan = (e) => {
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            dispatch({
                type: "SET LANGUAGE",
                payload: {
                    language: "en"
                }
            })
            setLanguageGotted(survival_game["en"])
            setEn(0);
            setEs(1);
        } else {
            dispatch({
                type: "SET LANGUAGE",
                payload: {
                    language: "es"
                }
            })
            setLanguageGotted(survival_game["es"])
            setEn(1);
            setEs(0);
        }
    }

    return (
        <div ref={animation} className="survival-new-game">
            <label onClick={setLan} className={state.language == "es" ? "lan-choose": "lan-choose active"}>
                <span className="lan-op" style={{opacity: es}}>
                    es
                </span>
                <span className="lan-op" style={{opacity: en}}>
                    en
                </span>
            </label>
            <button onClick={newGame}>{language_gotted.survivalGame.new}</button>
            { gameLoaded !== null && gameLoaded.load &&
                <button onClick={loadGame}>{language_gotted.survivalGame.load}</button>
            }
        </div>
    )
}

export default SurvivalNewGame;