import React, { useState, useEffect } from 'react';
import "../css/survivalGameMenu.scss";
import {
    probability_tree,
    probability_rock,
	bonfire_build
} from "../dataValues/survivalGameValues";
import { existsMaterial, materialNeeded } from '../helpers/SurvivalHelper';

const SurvivalGameMenu = ({state, dispatch}) => {
	
	// unable buttons on click for 3sec
	const initialCountDown = 3;
	const [disableSurvivalButtons, setDisableSurvivalButtons] = useState(false);
	const [countdown, setCountdown] = useState(initialCountDown);
    
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

	const handleClickBonfire = (e) => {
		
		e.preventDefault();
		disableBtns();
		
		let status = true;

		const [wood_amount, stone_amount] = bonfire_build;
		const wood = existsMaterial([...state.items], "wood");
		const stone = existsMaterial([...state.items], "stone");

		if (wood.wood < wood_amount) {
			state = false;
			console.log(materialNeeded(wood, "wood", wood_amount))
		}
		if (stone.stone < stone_amount) {
			state = false;
			console.log(materialNeeded(stone, "stone", stone_amount))
		}

		if (!state) {
			console.log("need rss");
			return;
		}

		dispatch({
			type: "REST MATERIALS",
			payload: {
				name: "wood",
				amount: wood_amount
			}
		})
		
		dispatch({
			type: "REST MATERIALS",
			payload: {
				name: "stone",
				amount: stone_amount
			}
		})

		dispatch({
			type: "ADD CRAFT",
			payload: {
				craft: "bonfire",
				amount: 1
			}
		})

	}
    
    
    return (
        <div className="survival-menu-main">
            <button disabled={disableSurvivalButtons} onClick={handleClickBonfire}>{ disableSurvivalButtons ? countdown : "Bonfire" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickEn}>{ disableSurvivalButtons ? countdown : "Cook" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickEn}>{ disableSurvivalButtons ? countdown : "Env" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickEn}>{ disableSurvivalButtons ? countdown : "Eat" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickEn}>{ disableSurvivalButtons ? countdown : "Cottage" }</button>
        </div>
    )
}

export default SurvivalGameMenu;