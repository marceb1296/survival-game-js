import React, { useState, useEffect } from 'react';
import "../css/survivalGamePlayer.scss";

const SurvivalGamePlayer = ({state}) => {

    const [life, setLife] = useState(2);
    const [food, setFood] = useState(1);

    // handle events

    useEffect(() => {

        const inteval = setInterval(() => {
            setFood(el => el - 1)
        }, 3000);

        if (food === 0) {
            clearInterval(inteval);
        }
    
        return () => clearInterval(inteval);
    }, [food, setFood]);

    useEffect(() => {

        if (food === 0) {

            const intervalLife = setInterval(() => {
                setLife(el => el - 1);
            }, 3000);

            if (life === 0) {
                // Game Over
                clearInterval(intervalLife);
            }
            
            return () => clearInterval(intervalLife);
        }
        
    
    }, [food, setLife, life]);


    return (
        <div className="survival-player">
            <div className="survival-materials">
                <p>
                    { state.items.map((item, index) => <label key={index}>
                        <span>{Object.keys(item)[0]}: </span>
                        <span>{Object.values(item)[0]}</span>
                    </label>)

                    }
                </p>
            </div>
            <div className="survival-state">
                <p>
                    <label>
                        <span>Life: </span>
                        <progress value={life} max="100"></progress>
                        <span>{life}%</span>
                    </label>
                    <label>
                        <span>Food: </span> 
                        <progress value={food} max="100"></progress>
                        <span>{food}%</span>
                    </label>
                </p>
            </div>
        </div>
    );
}
 
export default SurvivalGamePlayer;