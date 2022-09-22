import React, { useEffect } from 'react';
import "../css/survivalGameNotify.scss";

const SurvivalGameNotify = ({state, dispatch}) => {

    useEffect(() => {
        
        const delNotify = async () => {
                 
            const el = state.notifys[0];
            const getNotify = document.getElementById(`notify-${el.id}`);
            
            if (getNotify ===  null) {
                return;
            }

            await new Promise(r => setTimeout(r, 1900));
            getNotify.classList.toggle("fadeOut");
            
            await new Promise(r => setTimeout(r, 1000));   
            dispatch({
                type: "DEL NOTIFY",
                payload: {
                    id: el.id
                }
            });
        }

        if (state.notifys.length > 0) {
            delNotify();
        }

    }, [state.notifys, dispatch]);


    return (
        <div className="survival-notify-container">
            {
                state.notifys.map((el, index) => <label className="fadeIn" id={`notify-${el.id}`} key={index}>
                    {el.message.map((element, indexEl) => <span key={indexEl}>{element} <br /></span>)}
                    </label>)
            }
        </div>
    )
}

export default SurvivalGameNotify;