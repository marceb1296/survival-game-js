import "../css/survivalGameMenuLeft.scss";
import { build_axe_wood, build_knife, build_knife_wood } from "../dataValues/survivalGameValues";
import { existsCraft, existsItem, materialNeeded } from '../helpers/SurvivalHelper';
import { language } from "../lan/language";

const SurvivalGameMenuLeft = ({state, dispatch}) => {

	const { survival_game } = language;
    const language_gotted = survival_game[state.language];

    // events
	const disableBtns = async () => {
		dispatch({
			type: "HANDLE BTNS"
		})
	} 

    const handleClickKnife = (e) => {
        e.preventDefault();
		disableBtns();

		const {exist: existKnife} = existsCraft(state.crafts, "knife");
		if (existKnife) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: language_gotted.survivalGameMenuLeft.knife_once
				}
			})
			return;
		}

		let notifys = [];
		
		let status = true;

		const [wood_amount, stone_amount] = build_knife;
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
				craft: "knife",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: language_gotted.survivalGameMenuLeft.knife_build
			}
		})
    }
	
    const handleClickKnifeWood = (e) => {
        e.preventDefault();
		disableBtns();

		const {exist: existKnifeWood} = existsCraft(state.crafts, "knife_wood");
		if (existKnifeWood) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: language_gotted.survivalGameMenuLeft.knife_wood_once
				}
			})
			return;
		}

		const wood_amount = build_knife_wood;
		const wood = existsItem([...state.items], "wood");

		let [wood_left, firstMaterial] = materialNeeded(wood, wood_amount)

		if (wood.amount < wood_amount) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: `${language_gotted.survivalGameMaterials.need} ${wood_left} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames[firstMaterial]}!`
				}
			})
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
			type: "ADD CRAFT",
			payload: {
				craft: "knife_wood",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: language_gotted.survivalGameMenuLeft.knife_wood_build
			}
		})
    }

	const handleClickAxe = (e) => {

		e.preventDefault();
		disableBtns();

		const {exist: existAxe} = existsCraft(state.crafts, "axe_wood");
		if (existAxe) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: language_gotted.survivalGameMenuLeft.wood_axe_once
				}
			})
			return;
		}

		const wood_amount = build_axe_wood;
		const wood = existsItem([...state.items], "wood");

		let [wood_left, firstMaterial] = materialNeeded(wood, wood_amount)

		if (wood.amount < wood_amount) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: `${language_gotted.survivalGameMaterials.need} ${wood_left} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGameNames[firstMaterial]}!`
				}
			})
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
			type: "ADD CRAFT",
			payload: {
				craft: "axe_wood",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: language_gotted.survivalGameMenuLeft.wood_axe_build
			}
		})
	}

    return (
        <div className="survival-menu-left">
            <button disabled={state.btns} onClick={handleClickKnife}>{ state.btns ? state.layer_countdown : "Build knife" }</button>
            <button disabled={state.btns} onClick={handleClickKnifeWood}>{ state.btns ? state.layer_countdown : "Build wood knife" }</button>
			<button disabled={state.btns} onClick={handleClickAxe}>{ state.btns ? state.layer_countdown : "Build axe" }</button>
        </div>
    );
}
 
export default SurvivalGameMenuLeft;