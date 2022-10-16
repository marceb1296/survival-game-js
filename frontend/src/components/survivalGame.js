import React, { useEffect } from 'react';
import "../css/survivalGameApp.scss";
import "../css/survivalGameCenter.scss";
import SurvivalGameCrafts from "./survivalGameCrafts";
import SurvivalGameMenu from "./survivalGameMenu";
import SurvivalGamePlayer from "./survivalGamePlayer";
import SurvivalGameSides from "./survivalGameSides";
import SurvivalGameNotify from "./survivalGameNotify";
import SurvivalGameOver from "./survivalGameOver";
import SurvivalNewGame from "./survivalNewGame";
import { probability_get_from_anm } from "../dataValues/survivalGameValues";

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

            document.getElementById(`crafts-${id}`).classList.toggle("fadeOut")
            await new Promise(r => setTimeout(r, 2000));
            dispatch({
                type: "DEL CRAFT",
                payload: {
                    craft: name
                }
            })
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `- 1 ${name}!`
                }
            })
        }

        state.crafts.forEach(el => {
            const { name, life, id } = el;

            if (life < 1) {
                delCraft(name, id);
            }

        })
        
    }, [state.crafts, dispatch]);

    // del anm
    useEffect(() => {

        const delAnm = async ({ id, name, meat, leather, rope }) => {
            
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `Haz matado al ${name}`
                }
            });
            
            if (probability_get_from_anm() > 0) {
                
                const rewards = { meat, rope, leather };
                
                Object.entries(rewards).forEach(([key, value]) => {
                    
                    dispatch({
                        type: "ADD ITEM",
                        payload: {
                            item: key,
                            amount: value
                        }
                    });
                    dispatch({
                        type: "ADD NOTIFY",
                        payload: {
                            message:
                            `+ ${value} de ${key}`
                        }
                    })
                })
            }
            
            document.getElementById(`anm-container-${id}`).classList.toggle("fadeOut")
            document.getElementById(`anm-container-${id}`).classList.toggle("active")
            
            await new Promise(r => setTimeout(r, 900));
            dispatch({
                type: "DEL ANM"
            });
        }

        if (Object.keys(state.anm).length > 0) {
            const { life } = state.anm;

            if (life < 1) {
                delAnm(state.anm);
            }
        }
    
    }, [state.anm, dispatch]);
    
    return (
        <div className="survival-container" style={{backgroundImage: `url("survival/possible-bg.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
            { !state.start_game &&
                <SurvivalNewGame load={state.load} dispatch={dispatch}/>
            }
            <div className="survival-container-layouts">
                <SurvivalGameSides state={state} dispatch={dispatch} side="left" />              
                <div className="survival-center"></div>
                <SurvivalGameSides state={state} dispatch={dispatch} side="right" />
            </div>
            <SurvivalGameMenu state={state} dispatch={dispatch}/>
            <SurvivalGamePlayer state={state} dispatch={dispatch}/>
            <SurvivalGameCrafts state={state}/>
            <SurvivalGameNotify state={state} dispatch={dispatch}/>
            { state.life < 1 &&
                <SurvivalGameOver />
            }
        </div>
    );
}
 
export default SurvivalGame;