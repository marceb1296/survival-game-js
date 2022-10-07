import "../css/survivalGameMenuLeft.scss";
import { build_knife } from "../dataValues/survivalGameValues";
import { existsItem, materialNeeded } from '../helpers/SurvivalHelper';

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

    return (
        <div className="survival-menu-left">
            <button disabled={state.btns} onClick={handleClickKnife}>{ state.btns ? state.layer_countdown : "Build knife" }</button>
            <button disabled={state.btns} onClick={disableBtns}>{ state.btns ? state.layer_countdown : "Build wood knife" }</button>
            
        </div>
    );
}
 
export default SurvivalGameMenuLeft;