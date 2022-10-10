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

const SurvivalGameMenuMain = ({state, dispatch}) => {
	

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
				`Haz logrado escapar del ${state.anm.name}`,
				`Pero has recibido ${state.anm.damage * 2} de daño!`
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
					message: "Solo puedes crear una Fogata a la vez!"
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
			status = false;
			notifys = [...notifys, materialNeeded(wood, wood_amount)]
			
		}
		if (stone.amount < stone_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(stone, stone_amount)]
			
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
				message: `- ${wood_amount} de madera!`
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
				message: `- ${wood_amount} de piedra!`
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
				message: "Bonfire builded!"
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
					message: "Necesitas una fogata!"
				} 
			})
			return;
		}

		const { amount } = existsItem(state.items, "meat");

		if (amount < 1) {
			 
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: "No tienes carne para cocinar!"
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
				message: "- 1 de carne!"
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
				message: "+ 1 de carne cocida!"
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: "Haz cocinado una pieza de carne!"
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
				message: `Bonfire: - ${restLifeCraft} de vida!`
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
					message: "No tienes carne para comer!"
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
					message: "- 1 de carne cocinada!"
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
					message: `+ ${foodAmount} de comida!`
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
					message: "- 1 de carne!"
				}
			})

			const rotten_food = probability_rotten_food();
			
			if (rotten_food > 0) {
				
				const rest_life = rest_life_by_rotten_food();
				const lifeAmount = state.life - rest_life
				let notifys = [
					`- ${rest_life} de vida`,
					"La hubiese cocinado mejor..."
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
					message: `+ ${foodAmount} de comida!`
				}
			})

		}

	}

	const handleClickPickaxe = (e) => {

		e.preventDefault();
		disableBtns();
		let notifys = [];
		
		let status = true;

		const [wood_amount, stone_amount] = build_pickaxe_stone;
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
				message: `- ${wood_amount} de madera!`
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
				message: `- ${stone_amount} de piedra!`
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
				message: "Pickaxe builded!"
			}
		})
	}    
    
    return (
        <div className="survival-menu-main">
            <button disabled={state.btns} onClick={handleClickBonfire}>{ state.btns ? state.layer_countdown : "Bonfire" }</button>
            <button disabled={state.btns} onClick={handleClickCook}>{ state.btns ? state.layer_countdown : "Cook" }</button>
            <button disabled={state.btns} onClick={handleClickEn}>{ state.btns ? state.layer_countdown : "Env" }</button>
            <button disabled={state.btns} onClick={handleClickEat}>{ state.btns ? state.layer_countdown : "Eat" }</button>
            <button disabled={state.btns} onClick={handleClickPickaxe}>{ state.btns ? state.layer_countdown : "Build pickaxe" }</button>
           
            
        </div>
    )
}

export default SurvivalGameMenuMain;