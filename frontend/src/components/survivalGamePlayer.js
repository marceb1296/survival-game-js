import React, { useEffect } from 'react';
import "../css/survivalGamePlayer.scss";

const SurvivalGamePlayer = ({state, dispatch}) => {


    // handle events

    useEffect(() => {
        if (state.start_game) {
            
            const interval = setInterval(() => {
                dispatch({
                    type: "SET FOOD",
                    payload: {
                        food: state.food - 1
                    }
                })
            }, 3000);
    
            if (state.food < 1 && state.start_game) {
                clearInterval(interval);
            }
        
            return () => clearInterval(interval);
        }
    }, [state.food, dispatch, state.start_game]);

    useEffect(() => {

        if (state.food === 0 && state.start_game) {


            const intervalLife = setInterval(() => {
                dispatch({
                    type: "SET LIFE",
                    payload: {
                        life: state.life - 1
                    }
                })
            }, 3000);

            if (state.life === 0) {
                // Game Over
                clearInterval(intervalLife);
            }
            
            return () => clearInterval(intervalLife);
        }

        // regenerate life if has enought food
        if (state.food > 90 && state.life < 99 && state.start_game) {

            const interval = setInterval(() => {
                dispatch({
                    type: "SET LIFE",
                    payload: {
                        life: state.life + 2
                    }
                })
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `+ 2 de vida!`
                    }
                })
            }, 3000);

            return () => clearInterval(interval);

        } else if (state.food > 90 && state.life > 98 && state.life < 100 && state.start_game) {
            dispatch({
                type: "SET LIFE",
                payload: {
                    life: state.life + (100 - state.life)
                }
            })
        }

        
    
    }, [state.food, state.life, state.start_game, dispatch]);


    return (
        <div className="survival-player">
            <div className="survival-materials">
                <p>
                    { state.items.map((item, index) => <label key={index}>
                        <span>{item.name}: </span>
                        <span>{item.amount}</span>
                    </label>)

                    }
                    { state.crafts.map((item, index) => <label key={index}>
                        <span>{item.name}: </span>
                        <span>{item.amount}</span>
                    </label>)

                    }
                </p>
            </div>
            <div className="survival-state">
                <p>
                    <label>
                        <span>Life: </span>
                        <progress value={state.life} max="100"></progress>
                        <span>{state.life}%</span>
                    </label>
                    <label>
                        <span>Food: </span> 
                        <progress value={state.food} max="100"></progress>
                        <span>{state.food}%</span>
                    </label>
                </p>
            </div>
        </div>
    );
}
 
export default SurvivalGamePlayer;