import React, { useEffect, useState } from 'react';
import "../css/survivalGameMenuMain.scss";
import {
    probability_tree,
    probability_rock,
	bonfire_build,
	food_cooked_meat,
	probability_rotten_food,
	rest_life_by_rotten_food,
	food_meat,
	probability_anm,
	build_pickaxe_stone
} from "../dataValues/survivalGameValues";
import { existsCraft, existsItem, materialNeeded, restRandomLife } from '../helpers/SurvivalHelper';
import { language } from "../lan/language";

const SurvivalGameMenuMain = ({state, dispatch}) => {
	
	const { survival_game } = language;
    const [language_gotted, setLanguageGotted] = useState(survival_game[state.language])
    
    useEffect(() => {
        setLanguageGotted(survival_game[state.language])
    }, [survival_game, state.language, setLanguageGotted])
    
    // events
	const disableBtns = async () => {
		dispatch({
			type: "HANDLE BTNS"
		})
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

		if (Object.keys(state.anm).length > 0) {

			let notifys = [
				`${language_gotted.survivalGameMenuCenter.escape} ${language_gotted.survivalGameNames[state.anm.name]}`,
				`${language_gotted.survivalGameMenuCenter.receive} + ${state.anm.damage * 2} ${language_gotted.survivalGameMenuCenter.damage}`
			]

			notifys.forEach(el => dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: el
				}
			}))

			dispatch({
				type: "SET LIFE",
				payload: {
					life: state.life - (state.anm.damage * 2)
				}
			})

			const { id: anm_id } = state.anm;
			document.getElementById("anm-container-" + anm_id).classList.toggle("fadeOut");
			await new Promise(r => setTimeout(r, 900));
			dispatch({
				type: "DEL ANM"
			})

			


		}
    	
    	
    	await new Promise(r => setTimeout(r, 500));
    	
    	const tree = probability_tree();
    	const rock = probability_rock();
    	
    	if (tree > 0) {
    		for (let i = 0; i < tree; i++) {
     		    dispatch({
    			    type: "SET TREE"
    		    })
    		}
    	}
    	
    	if (rock > 0) {
    		for (let i = 0; i < rock; i++) {
				dispatch({
					type: "SET ROCK"
				})
			}
    	}

		if (probability_anm() > 0) {
			dispatch({
				type: "SET ANM"
			})
		}
    }

	const handleClickBonfire = (e) => {
		
		e.preventDefault();
		disableBtns();

		const {exist: existBonfire} = existsCraft(state.crafts, "bonfire");
		if (existBonfire) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: language_gotted.survivalGameMenuCenter.bonfire_once
				}
			})
			return;
		}

		let notifys = [];
		
		let status = true;

		const [wood_amount, stone_amount] = bonfire_build;
		const wood = existsItem([...state.items], "wood");
		const stone = existsItem([...state.items], "stone");

		if (wood.amount < wood_amount) {
			let [wood_left, firstMaterial] = materialNeeded(wood, wood_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterials.need} ${wood_left} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames[firstMaterial]}!`];
			
		}
		if (stone.amount < stone_amount) {
			let [stone_left, secondMaterial] = materialNeeded(stone, stone_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterials.need} ${stone_left} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames[secondMaterial]}!`]
			
		}

		if (!status) {
			notifys.forEach(el => dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: el
				}
			}))
			return;
		}

		// has materials

		dispatch({
			type: "REST ITEM",
			payload: {
				name: "wood",
				amount: wood_amount
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `- ${wood_amount} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames["wood"]}!`
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
			type: "ADD NOTIFY",
			payload: {
				message: `- ${wood_amount} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames["stone"]}`
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
				message: language_gotted.survivalGameMenuCenter.bonfire_build
			}
		})

	}

	const handleClickCook = (e) => {
		e.preventDefault();
		disableBtns();

		const {exist: existBonfire, life: lifeBonfire} = existsCraft(state.crafts, "bonfire");

		if (!existBonfire) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: language_gotted.survivalGameMenuCenter.need_bonfire
				} 
			})
			return;
		}

		const { amount } = existsItem(state.items, "meat");

		if (amount < 1) {
			 
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: language_gotted.survivalGameMenuCenter.not_meat
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
			type: "ADD NOTIFY",
			payload: {
				message: `- 1 ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames.meat}`
			}
		})


		dispatch({
			type: "ADD ITEM",
			payload: {
				item: "cooked_meat",
				amount: 1
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `+ 1 ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames.cooked_meat}`
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: language_gotted.survivalGameMenuCenter.cooked_meat
			} 
		})
		const restLifeCraft = restRandomLife(lifeBonfire);

		dispatch({
			type: "REST CRAFT LIFE",
			payload: {
				craft: "bonfire",
				life: lifeBonfire - restLifeCraft
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `${language_gotted.survivalGameNames.bonfire}: - ${restLifeCraft} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame.life}!`
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
					message: language_gotted.survivalGameMenuCenter.not_meat_eat
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
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: `- 1 ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames.cooked_meat}!`
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
					message: `+ ${foodAmount} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame.food}!`
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
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: `- 1 ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames.meat}!`
				}
			})

			const rotten_food = probability_rotten_food();
			
			if (rotten_food > 0) {
				
				const rest_life = rest_life_by_rotten_food();
				const lifeAmount = state.life - rest_life
				let notifys = [
					`- ${rest_life} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame.life}`,
					language_gotted.survivalGameMenuCenter.should_cooked
				];

				dispatch({
					type: "SET LIFE",
					payload: {
						life: lifeAmount
					}
				})

				
				notifys.forEach(el => dispatch({
					type: "ADD NOTIFY",
					payload: {
						message: el
					}
				}))

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
					message: `+ ${foodAmount} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames.meat}!`
				}
			})

		}

	}

	const handleClickPickaxe = (e) => {

		e.preventDefault();
		disableBtns();

		const {exist: existsPickaxe} = existsCraft(state.crafts, "pickaxe");
		if (existsPickaxe) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: language_gotted.survivalGameMenuCenter.pickaxe_once
				}
			})
			return;
		}

		let notifys = [];
		
		let status = true;

		const [wood_amount, stone_amount] = build_pickaxe_stone;
		const wood = existsItem([...state.items], "wood");
		const stone = existsItem([...state.items], "stone");

		if (wood.amount < wood_amount) {
			let [wood_left, firstMaterial] = materialNeeded(wood, wood_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterials.need} ${wood_left} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames[firstMaterial]}!`];
			
		}
		if (stone.amount < stone_amount) {
			let [stone_left, secondMaterial] = materialNeeded(stone, stone_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterials.need} ${stone_left} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames[secondMaterial]}!`]
			
		}

		if (!status) {
			notifys.forEach(el => dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: el
				}
			}))
			return;
		}	
		
		// has materials

		dispatch({
			type: "REST ITEM",
			payload: {
				name: "wood",
				amount: wood_amount
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `- ${wood_amount} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames["wood"]}!`
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
			type: "ADD NOTIFY",
			payload: {
				message: `- ${stone_amount} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames["stone"]}!`
			}
		})

		dispatch({
			type: "ADD CRAFT",
			payload: {
				craft: "pickaxe",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: language_gotted.survivalGameMenuCenter.pickaxe_build
			}
		})
	}    
    
    return (
        <div className="survival-menu-main">
            <button disabled={state.btns} onClick={handleClickBonfire}>{ state.btns ? state.layer_countdown : language_gotted.survivalGameNames.bonfire }</button>
            <button disabled={state.btns} onClick={handleClickCook}>{ state.btns ? state.layer_countdown : language_gotted.survivalGameNames.cook }</button>
            <button disabled={state.btns} onClick={handleClickEn}>{ state.btns ? state.layer_countdown : language_gotted.survivalGameNames.forward }</button>
            <button disabled={state.btns} onClick={handleClickEat}>{ state.btns ? state.layer_countdown : language_gotted.survivalGameNames.eat }</button>
            <button disabled={state.btns} onClick={handleClickPickaxe}>{ state.btns ? state.layer_countdown : language_gotted.survivalGameNames.b_pickaxe }</button>
           
            
        </div>
    )
}

export default SurvivalGameMenuMain;