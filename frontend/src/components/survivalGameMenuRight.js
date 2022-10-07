import "../css/survivalGameMenuRight.scss";

const SurvivalGameMenuRight = ({state, dispatch}) => {

    const handleClick = async () => {
		dispatch({
			type: "HANDLE BTNS"
		})
	} 

    return (
        <div className="survival-menu-right">
            <button disabled={state.btns} onClick={handleClick}>{ state.btns ? state.layer_countdown : "Build upper armor" }</button>
            <button disabled={state.btns} onClick={handleClick}>{ state.btns ? state.layer_countdown : "Build leg armor" }</button>
        </div>
    );
}
 
export default SurvivalGameMenuRight;