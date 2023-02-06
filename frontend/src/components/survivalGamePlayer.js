import React, { useEffect } from 'react';
import "../css/survivalGamePlayer.scss";
import { language } from "../lan/language";

const SurvivalGamePlayer = ({state, dispatch}) => {


    const { survival_game } = language;
    const language_gotted = survival_game[state.language];

    // handle minutes
    useEffect(() => {
        if (state.start_game && !state.game_over) {
            
            if (state.minutes > 59 && state.hour < 25) {
                dispatch({
                    type: "SET HOUR",
                    payload: {
                        hour: state.hour + 1
                    }
                })
                
                dispatch({
                    type: "SET MINUTES",
                    payload: {
                        minutes: 0
                    }
                })
            }
            const minutesInterval = setInterval(() => {
                dispatch({
                    type: "SET MINUTES",
                    payload: {
                        minutes: state.minutes + 1
                    }
                })
            }, 50);
    
            return () => clearInterval(minutesInterval)
        }
    }, [state.game_over, state.start_game, state.minutes, state.hour, dispatch]);

    // handle food
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

    // handle game over
    useEffect(() => {

        if (state.life === 0) {
            dispatch({
                type: "GAME OVER",
                payload: {
                    game_over: true
                }
            })
            localStorage.removeItem("survival_game");
        }

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
                localStorage.removeItem("survival_game");
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
                        message: `+ 2 ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["life"]}!`
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
            <div className='survival-player-container'>
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
            <div className='survival-player-timer'>
                <span>{state.hour}:{state.minutes < 10 ? `0${state.minutes}` : state.minutes}</span>
            </div>
        </div>
    );
}
 
export default SurvivalGamePlayer;