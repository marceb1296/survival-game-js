import React, { useState, useEffect } from 'react';
import "../css/survivalGameMenu.scss";

const SurvivalGameMenu = ({state, dispatch}) => {
	
	// unable buttons on click for 3sec
	const initialCountDown = 3;
	const [disableSurvivalButtons, setDisableSurvivalButtons] = useState(false);
	const [countdown, setCountdown] = useState(initialCountDown);

	// probabilitys
	const probability_tree = [0, 0, 1, 0, 0, 2, 0, 0, 1, 0];
    const probability_rock = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1];
    
	// hooks 
	useEffect(() => {

		if (disableSurvivalButtons) {
			const interval = setInterval(() => {
				setCountdown(count => count - 1);
			}, 1000);

			if (countdown === 0) {
				clearInterval(interval);
				setDisableSurvivalButtons(state => !state);
				setCountdown(initialCountDown);
			}

			return () => clearInterval(interval);
 		}



	}, [disableSurvivalButtons, countdown, setCountdown, initialCountDown]);

    // events
	const disableBtns = async () => {
		setDisableSurvivalButtons(state => !state);
	} 

    const handleClickEn = async (e) => {
    	
    	e.preventDefault();

		disableBtns();

		state.tree.forEach(async el => {
			document.getElementById("tree-" + el.id).classList.toggle("fadeOut");
			await new Promise(r => setTimeout(r, 900));
			dispatch({
				type: "DEL TREE",
				payload: {
					id: el.id
				}
			})
		});
		state.rock.forEach(async el => {
			document.getElementById("rock-" + el.id).classList.toggle("fadeOut");
			await new Promise(r => setTimeout(r, 900));
			dispatch({
				type: "DEL ROCK",
				payload: {
					id: el.id
				}
			})
		});
    	
    	
    	await new Promise(r => setTimeout(r, 500));
    	
    	const tree = probability_tree[~~(Math.random() * probability_tree.length)];
    	const rock = probability_rock[~~(Math.random() * probability_rock.length)];
    	
    	if (tree > 0) {
    		for (let i = 0; i < tree; i++) {
     		    dispatch({
    			    type: "SET TREE"
    		    })
    		}
    	}
    	
    	if (rock > 0) {
    		for (let i = 0; i < rock; i++)
    		dispatch({
    			type: "SET ROCK"
    		})
    	}
    }
    
    
    return (
        <div className="survival-menu">
            <button disabled={disableSurvivalButtons} onClick={handleClickEn}>{ disableSurvivalButtons ? countdown : "Env" }</button>
        </div>
    )
}

export default SurvivalGameMenu;