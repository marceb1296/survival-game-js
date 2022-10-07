import React, { useEffect } from 'react';
import "../css/survivalGameNotify.scss";

const SurvivalGameNotify = ({state, dispatch}) => {

    useEffect(() => {

        const interval = setTimeout(async () => {

            if (state.notifys.length > 0) {

                let el = state.notifys[0];
                //let getNotify = document.getElementById(`notify-${el.id}`);
            
                dispatch({
                    type: "DEL NOTIFY",
                    payload: {
                        id: el.id
                    }
                });
            }
            
        }, 2000);


        return () => clearTimeout(interval);        

    }, [state.notifys, dispatch]);


    return (
        <div className="survival-notify-container">
            {
                state.notifys.map((el, index) => <label className="fadeIn" id={`notify-${el.id}`} key={index}>
                    <span >{el.message} <br /></span>
                    </label>)
            }
        </div>
    )
}

export default SurvivalGameNotify;