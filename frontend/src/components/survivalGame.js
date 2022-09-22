import React, { useEffect } from 'react';
import "../css/survivalGameApp.scss";
import "../css/survivalGameCenter.scss";
import SurvivalGameCrafts from "./survivalGameCrafts";
import SurvivalGameMenu from "./survivalGameMenu";
import SurvivalGamePlayer from "./survivalGamePlayer";
import SurvivalGameSides from "./survivalGameSides";
import SurvivalGameNotify from "./survivalGameNotify";

const SurvivalGame = ({state, dispatch}) => {

    // del item
    useEffect(() => {
        
        state.items.forEach(element => {
            const { name, amount } = element;
           
            if (amount < 1) {
                dispatch({
                    type: "DEL ITEM",
                    payload: {
                        name: name
                    }
                })
            }
        });
        
        
    }, [state.items, dispatch]);

    // del craft
    useEffect(() => {

        const delCraft = async (name, id) => {

            const getCraft = document.getElementById(`crafts-${id}`).classList.toggle("fadeOut")
            await new Promise(r => setTimeout(r, 2000));
            dispatch({
                type: "DEL CRAFT",
                payload: {
                    craft: name
                }
            })
        }
        
        const itemDelete = [];

        state.crafts.forEach(el => {
            const { name, life, id } = el;

            if (life < 1) {
                delCraft(name, id);
            }

        })
        
    }, [state.crafts, dispatch]);

    /*
    // regenerate life if has enought food
    useEffect(() => {
        console.log("enter hook")
        let interval;

        if (state.food > 90 && state.life < 98) {
            interval = setInterval(() => {
                dispatch({
                    type: "SET LIFE",
                    payload: {
                        life: state.life + 3
                    }
                })
                console.log("restore life")
            }, 3000);

        } else if (state.food > 90 && state.life < 100) {
            dispatch({
                type: "SET LIFE",
                payload: {
                    life: state.life + (100 - state.life)
                }
            })
        }
        return () => interval !== undefined && clearInterval(interval);

    }, [state.life, state.food, dispatch]);
    */
    
    return (
        <div className="survival-container">
            <div className="survival-container-layouts">
                <SurvivalGameSides state={state} dispatch={dispatch} side="left" />              
                <div className="survival-center"></div>
                <SurvivalGameSides state={state} dispatch={dispatch} side="right" />
            </div>
            <SurvivalGameMenu state={state} dispatch={dispatch}/>
            <SurvivalGamePlayer state={state} dispatch={dispatch}/>
            <SurvivalGameCrafts state={state}/>
            <SurvivalGameNotify state={state} dispatch={dispatch}/>
        </div>
    );
}
 
export default SurvivalGame;