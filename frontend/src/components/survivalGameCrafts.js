import "../css/survivalGameCrafts.scss"

const SurvivalGameCrafts = ({state}) => {
    return (
        <div className="survival-crafts-container">
            {
                state.crafts.map((el, index) => <div key={index} id={`crafts-${el.id}`} className="survival-crafts">
                    <progress value={el.life} max="100"></progress>
                    <img id={`craft-${el.id}`} src={`/${el.name}.png`} alt={el.name}></img>
                </div>)
            }
        </div>
    );
}
 
export default SurvivalGameCrafts;