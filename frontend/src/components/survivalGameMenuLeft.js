import "../css/survivalGameMenuLeft.scss";
import { build_axe_wood, build_knife, build_knife_wood } from "../dataValues/survivalGameValues";
import { existsCraft, existsItem, materialNeeded } from '../helpers/SurvivalHelper';

const SurvivalGameMenuLeft = ({state, dispatch}) => {

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
					message: "Solo puedes crear un Cuchillo a la vez!"
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
				craft: "knife",
				amount: 1
			}
		})

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: "knife builded!"
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
					message: "Solo puedes crear un Cuchillo de madera a la vez!"
				}
			})
			return;
		}

		const wood_amount = build_knife_wood;
		const wood = existsItem([...state.items], "wood");

		if (wood.amount < wood_amount) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: materialNeeded(wood, wood_amount)
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
				message: `- ${wood_amount} de madera!`
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
				message: "Wood knife builded!"
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
					message: "Solo puedes crear un Hacha de madera a la vez!"
				}
			})
			return;
		}

		const wood_amount = build_axe_wood;
		const wood = existsItem([...state.items], "wood");

		if (wood.amount < wood_amount) {
			dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: materialNeeded(wood, wood_amount)
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
				message: `- ${wood_amount} de madera!`
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
				message: "Wood axe builded!"
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