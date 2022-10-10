import "../css/survivalGameCrafts.scss"

const SurvivalGameCrafts = ({state}) => {


    return (
        <div className="survival-crafts-container">
            {
                state.crafts.map((el, index) => <div key={index} id={`crafts-${el.id}`} className={`survival-crafts size-${Object.keys(state.crafts).length}`}>
                    <div className="vertical-pb">
                        <div className="progress-bar" style={{width: el.life + "%"}}></div>
                    </div>
                    <img id={`craft-${el.id}`} src={`/survival/${el.name}.png`} alt={el.name}></img>
                </div>)
            }
        </div>
    );
}
 
export default SurvivalGameCrafts;