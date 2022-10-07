import React, { useEffect } from 'react';

import SurvivalGameMenuMain from "./survivalGameMenuCenter";
import SurvivalGameMenuLeft from "./survivalGameMenuLeft";
import SurvivalGameMenuRight from './survivalGameMenuRight';

const SurivivalGame = ({state, dispatch}) => {

    
	// hooks 
	useEffect(() => {

		if (state.btns) {
			const interval = setInterval(() => {
				dispatch({
					type: "LAYER COUNTDOWN",
                    payload: {
                        count: state.layer_countdown - 1
                    }
				})
			}, 1000);

			if (state.layer_countdown === 0) {
				clearInterval(interval);
				dispatch({
					type: "HANDLE BTNS"
				})
				dispatch({
					type: "LAYER COUNTDOWN",
                    payload: {
                        count: 3
                    }
				})
			}

			return () => clearInterval(interval);
 		}



	}, [state.btns, state.layer_countdown, dispatch]);

    return (
        <>
            <SurvivalGameMenuMain state={state} dispatch={dispatch} />
            <SurvivalGameMenuLeft state={state} dispatch={dispatch} />
            <SurvivalGameMenuRight state={state} dispatch={dispatch} />
        </>
    );
}
 
export default SurivivalGame;