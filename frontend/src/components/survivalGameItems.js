import "../css/survivalGameItems.scss"

const SurvivalGameItems = ({state}) => {
    return (
        <div className="survival-items-container">
            {
                state.crafts.map((el, index) => <div key={index} className="survival-items">
                    <progress value={el.life} max="100"></progress>
                    <img id={`craft-${el.id}`} src={`/${el.name}.png`} alt={el.name}></img>
                </div>)
            }
        </div>
    );
}
 
export default SurvivalGameItems;