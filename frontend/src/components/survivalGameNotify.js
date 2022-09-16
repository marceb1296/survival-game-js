import "../css/survivalGameNotify.scss";

const SurvivalGameNotify = ({state}) => {
    return (
        <div className="survival-notify-container">
            {
                state.notifys.map((el, index) => <span id={`notify-${el.id}`} key={index}>{el.message}</span>)
            }
        </div>
    )
}

export default SurvivalGameNotify;