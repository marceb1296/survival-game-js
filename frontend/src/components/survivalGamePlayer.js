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
                console.log("clean life")
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
                    { state.items.map((item, index) => <label key={index}>{Object.keys(item)[0]}:
                        <span>{Object.values(item)[0]}</span>
                    </label>)

                    }
                </p>
            </div>
            <div className="survival-state">
                <p>
                    <label>Life: 
                        <progress value={life} max="100"></progress>
                        {life}%
                    </label>
                    <label>food: 
                        <progress value={food} max="100"></progress>
                        {food}%
                    </label>
                </p>
            </div>
        </div>
    );
}
 
export default SurvivalGamePlayer;