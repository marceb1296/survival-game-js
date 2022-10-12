import "../css/survivalGameMenuRight.scss";
import { build_axe_stone, build_greaves_leg_armor_cost, build_upper_body_armor_cost } from "../dataValues/survivalGameValues";
import { existsCraft, existsItem, materialNeeded } from '../helpers/SurvivalHelper';

const SurvivalGameMenuRight = ({state, dispatch}) => {

    const disableBtns = async () => {
		dispatch({
			type: "HANDLE BTNS"
		})
	}

    const handleClickUpper = (e) => {
        e.preventDefault();
		disableBtns();

		const {exist: existUpperBody} = existsCraft(state.crafts, "upper_body_armor");
		if (existUpperBody) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: "Solo puedes crear una Armadura superior a la vez!"
				}
			})
			return;
		}

		let notifys = [];
		
		let status = true;

		const [wood_amount, leather_amount, rope_amount] = build_upper_body_armor_cost;
		const wood = existsItem([...state.items], "wood");
		const leather = existsItem([...state.items], "leather");
		const rope = existsItem([...state.items], "rope");

		if (wood.amount < wood_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(wood, wood_amount)]
			
		}
		if (leather.amount < leather_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(leather, leather_amount)]
			
		}
		if (rope.amount < rope_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(rope, rope_amount)]
			
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
				name: "leather",
				amount: leather_amount
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `- ${leather_amount} de cuero!`
			}
		})


		dispatch({
			type: "REST ITEM",
			payload: {
				name: "rope",
				amount: rope_amount
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `- ${rope_amount} de cuerda!`
			}
		})

		dispatch({
			type: "ADD CRAFT",
			payload: {
				craft: "upper_body_armor",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: "Upper body armor builded!"
			}
		})
    }

    const handleClickLeg = (e) => {
        e.preventDefault();
		disableBtns();

		const {exist: existLowerBody} = existsCraft(state.crafts, "lower_body_armor");
		if (existLowerBody) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: "Solo puedes crear una Armadura inferior a la vez!"
				}
			})
			return;
		}

		let notifys = [];
		
		let status = true;

		const [wood_amount, leather_amount, rope_amount] = build_greaves_leg_armor_cost;
		const wood = existsItem([...state.items], "wood");
		const leather = existsItem([...state.items], "leather");
		const rope = existsItem([...state.items], "rope");

		if (wood.amount < wood_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(wood, wood_amount)]
			
		}
		if (leather.amount < leather_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(leather, leather_amount)]
			
		}
		if (rope.amount < rope_amount) {
			status = false;
			notifys = [...notifys, materialNeeded(rope, rope_amount)]
			
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
				name: "leather",
				amount: leather_amount
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `- ${leather_amount} de cuero!`
			}
		})


		dispatch({
			type: "REST ITEM",
			payload: {
				name: "rope",
				amount: rope_amount
			}
		})
		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: `- ${rope_amount} de cuerda!`
			}
		})

		dispatch({
			type: "ADD CRAFT",
			payload: {
				craft: "greaves_leg_armor",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: "Greaves_leg_armor builded!"
			}
		})
    }

	const handleClickAxe = (e) => {

		e.preventDefault();
		disableBtns();

		const {exist: existAxeStone} = existsCraft(state.crafts, "axe_stone");
		if (existAxeStone) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: "Solo puedes crear un Hacha de piedra a la vez!"
				}
			})
			return;
		}

		let notifys = [];
		
		let status = true;

		const [wood_amount, stone_amount] = build_axe_stone;
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
				craft: "axe_stone",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: "Stone axe builded!"
			}
		})
	}

    return (
        <div className="survival-menu-right">
            <button disabled={state.btns} onClick={handleClickUpper}>{ state.btns ? state.layer_countdown : "Build upper armor" }</button>
            <button disabled={state.btns} onClick={handleClickLeg}>{ state.btns ? state.layer_countdown : "Build leg armor" }</button>
			<button disabled={state.btns} onClick={handleClickAxe}>{ state.btns ? state.layer_countdown : "Build stone axe" }</button>
        </div>
    );
}
 
export default SurvivalGameMenuRight;