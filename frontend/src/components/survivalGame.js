import React, { useEffect } from 'react';
import "../css/survivalGameApp.scss";
import "../css/survivalGameCenter.scss";
import SurvivalGameItems from "./survivalGameItems";
import SurvivalGameMenu from "./survivalGameMenu";
import SurvivalGamePlayer from "./survivalGamePlayer";
import SurvivalGameSides from "./survivalGameSides";

const SurvivalGame = ({state, dispatch}) => {


    useEffect(() => {

        let itemsToDelete = [];
        
        state.items.forEach(element => {
            const [key, value] = Object.entries(element)[0];
           
            if (value < 1) {
                itemsToDelete = [...itemsToDelete, key];
            }
        });
        
        if (itemsToDelete.length > 0) {
            itemsToDelete.forEach(el => dispatch({
                type: "DEL ITEM",
                payload: {
                    name: el
                }
            }))
        }
        
    }, [state.items, dispatch]);
    
    
    return (
        <div className="survival-container">
            <div className="survival-container-layouts">
                <SurvivalGameSides state={state} dispatch={dispatch} side="left" />              
                <div className="survival-center"></div>
                <SurvivalGameSides state={state} dispatch={dispatch} side="right" />
            </div>
            <SurvivalGameMenu state={state} dispatch={dispatch}/>
            <SurvivalGamePlayer state={state}/>
            <SurvivalGameItems state={state}/>
        </div>
    );
}
 
export default SurvivalGame;