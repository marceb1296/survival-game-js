import React, { useState, useEffect } from 'react';
import "../css/survivalGameMenu.scss";
import {
    probability_tree,
    probability_rock,
	bonfire_build,
	food_cooked_meat,
	probability_rotten_food,
	rest_life_by_rotten_food,
	food_meat
} from "../dataValues/survivalGameValues";
import { existsCraft, existsItem, materialNeeded } from '../helpers/SurvivalHelper';

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
		let notifys = [];
		
		let status = true;

		const [wood_amount, stone_amount] = bonfire_build;
		const wood = existsItem([...state.items], "wood");
		const stone = existsItem([...state.items], "stone");

		if (wood.amount < wood_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(wood, wood_amount)]
			
		}
		if (stone.amount < stone_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(stone, stone_amount)]
			
		}

		if (!status) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: notifys
				}
			})
			return;
		}

		dispatch({
			type: "REST ITEM",
			payload: {
				name: "wood",
				amount: wood_amount
			}
		})
		
		dispatch({
			type: "REST ITEM",
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

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: ["Bonfire builded!"]
			}
		})

	}

	const handleClickCook = (e) => {
		e.preventDefault();
		disableBtns();

		const hasBonfire = existsCraft(state.crafts, "bonfire");

		if (!hasBonfire) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: ["Necesitas una fogata!"]
				} 
			})
			return;
		}

		const { name, amount } = existsItem(state.items, "meat");

		if (amount < 1) {
			 
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: ["No tienes carne para cocinar!"]
				} 
			})
			return;
		}


		dispatch({
			type: "REST ITEM",
			payload: {
				name: "meat",
				amount: 1
			}
		})

		dispatch({
			type: "ADD ITEM",
			payload: {
				item: "cooked meat",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: ["Haz cocinado una pieza de carne!"]
			} 
		})

		dispatch({
			type: "REST CRAFT LIFE",
			payload: {
				craft: "bonfire"
			}
		})

	}

	const handleClickEat = (e) => {

		e.preventDefault();
		disableBtns();

		const hasFood = existsItem(state.items, "meat");
		const hasCockedFood = existsItem(state.items, "cooked meat");
		
		if (hasFood.amount < 1 && hasCockedFood.amount < 1) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: ["No tienes carne para comer!"]
				}
			})
			return;
		}

		if (hasCockedFood.amount > 0) {
			dispatch({
				type: "REST ITEM",
				payload: {
					name: "cooked meat",
					amount: 1
				}
			})

			let foodAmount = state.food < 81 ? food_cooked_meat : (100 - state.food);
		
			dispatch({
				type: "SET FOOD",
				payload: {
					food: state.food + foodAmount
				}
			})

			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: [`+ ${foodAmount} de comida!`]
				}
			})

			return;
		}

		if (hasFood.amount > 0) {
			dispatch({
				type: "REST ITEM",
				payload: {
					name: "meat",
					amount: 1
				}
			})

			const rotten_food = probability_rotten_food[~~(Math.random() * probability_rotten_food.length)];
			
			if (rotten_food > 0) {
				
				const rest_life = rest_life_by_rotten_food();
				const lifeAmount = state.life - rest_life
				let setNotifys = [
					`- ${rest_life} de vida`,
					"La hubiese cocinado mejor..."
				];

				dispatch({
					type: "SET LIFE",
					payload: {
						life: lifeAmount
					}
				})

				
				dispatch({
					type: "ADD NOTIFY",
					payload: {
						message: setNotifys
					}
				})

				return;
			}

			const foodAmount = state.food < 96 ? food_meat : (100 - state.food);

			dispatch({
				type: "SET FOOD",
				payload: {
					food: state.food + foodAmount
				}
			})

			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: [`+ ${foodAmount} de comida!`]
				}
			})

		}

	}

	const handleClickAnmKill = (e) => {

		e.preventDefault();
		disableBtns();

		const cottage = existsCraft(state.crats, "cottage");

		if (!cottage) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: ["Necesitas una fogata!"]
				} 
			})
			return;
		}

	}
    
    
    return (
        <div className="survival-menu-main">
            <button disabled={disableSurvivalButtons} onClick={handleClickBonfire}>{ disableSurvivalButtons ? countdown : "Bonfire" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickCook}>{ disableSurvivalButtons ? countdown : "Cook" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickEn}>{ disableSurvivalButtons ? countdown : "Env" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickEat}>{ disableSurvivalButtons ? countdown : "Eat" }</button>
            <button disabled={disableSurvivalButtons} onClick={handleClickAnmKill}>{ disableSurvivalButtons ? countdown : "Kill animal" }</button>
        </div>
    )
}

export default SurvivalGameMenu;