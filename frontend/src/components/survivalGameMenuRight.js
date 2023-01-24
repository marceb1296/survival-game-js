import "../css/survivalGameMenuRight.scss";
import { build_axe_stone, build_greaves_leg_armor_cost, build_upper_body_armor_cost, shield_greaves_leg_armor, shield_upper_body_armor } from "../dataValues/survivalGameValues";
import { existsCraft, existsItem, materialNeeded } from '../helpers/SurvivalHelper';
import { language } from "../lan/language";

const SurvivalGameMenuRight = ({state, dispatch}) => {

	const { survival_game } = language;
    const language_gotted = survival_game[state.language];

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
					message: language_gotted.survivalGameMenuRight.up_arm_once
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
			let [wood_left, firstMaterial] = materialNeeded(wood, wood_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${wood_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[firstMaterial]}!`];
				
		}
		if (leather.amount < leather_amount) {
			let [leather_left, secondMaterial] = materialNeeded(leather, leather_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${leather_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[secondMaterial]}!`];
							
		}
		if (rope.amount < rope_amount) {
			let [rope_left, thirdMaterial] = materialNeeded(rope, rope_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${rope_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[thirdMaterial]}!`];
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
				message: `- ${wood_amount} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["wood"]}!`
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
				message: `- ${leather_amount} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["leather"]}!`
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
				message: `- ${rope_amount} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["rope"]}!`
			}
		})

		dispatch({
			type: "ADD CRAFT",
			payload: {
				craft: "upper_body_armor",
				amount: 1,
				life: shield_upper_body_armor
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: language_gotted.survivalGameMenuRight.up_arm_build
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
					message: language_gotted.survivalGameMenuRight.down_arm_once
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
			let [wood_left, firstMaterial] = materialNeeded(wood, wood_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${wood_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[firstMaterial]}!`];
				
		}
		if (leather.amount < leather_amount) {
			let [leather_left, secondMaterial] = materialNeeded(leather, leather_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${leather_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[secondMaterial]}!`];
							
		}
		if (rope.amount < rope_amount) {
			let [rope_left, thirdMaterial] = materialNeeded(rope, rope_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${rope_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[thirdMaterial]}!`];
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
				message: `- ${wood_amount} ${rope_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["wood"]}!`
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
				message: `- ${leather_amount} ${rope_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["leather"]}!`
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
				message: `- ${rope_amount} ${rope_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["rope"]}`
			}
		})

		dispatch({
			type: "ADD CRAFT",
			payload: {
				craft: "greaves_leg_armor",
				amount: 1,
				life: shield_greaves_leg_armor
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: language_gotted.survivalGameMenuRight.down_arm_build
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
					message: language_gotted.survivalGameMenuRight.stone_axe_once
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
			let [wood_left, firstMaterial] = materialNeeded(wood, wood_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${wood_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[firstMaterial]}!`];
					
		}
		if (stone.amount < stone_amount) {
			let [stone_left, secondMaterial] = materialNeeded(stone, stone_amount)
			status = false;
			notifys = [...notifys, `${language_gotted.survivalGameMaterial.need} ${stone_left} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames[secondMaterial]}!`]
						
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
				message: `- ${wood_amount} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["wood"]}!`
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
				message: `- ${stone_amount} ${language_gotted.survivalGameMaterial.of} ${language_gotted.survivalGameNames["stone"]}!`
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
				message: language_gotted.survivalGameMenuRight.stone_axe_once
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