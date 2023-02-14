import React, { useState } from 'react';
import "../css/survivalGameNew_Over.scss";
import { language } from "../lan/language";

const SurvivalGameOver = ({state}) => {

    const { survival_game } = language;
    // eslint-disable-next-line
    const [language_gotted, setLanguageGotted] = useState(survival_game[state.language])

    const newGame = (e) => {
        localStorage.removeItem("survival_game");
        window.location.reload();
    }
    return (
        <div className="survival-game-over" style={{animation: "fadeIn 2s ease-in-out"}}>
            <label>{language_gotted.survivalGame.end}</label>
            <button onClick={newGame}>{language_gotted.survivalGame.new}</button>
        </div>
    );
}

export default SurvivalGameOver;
