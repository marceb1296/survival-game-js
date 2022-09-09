import "../css/survivalGameLeft.scss";

const SurvivalGameLeft = ({state}) => {
    
    const getHeight = () => window.innerHeight

    const makeTree = (id, x, y) => {
        // max top 60%
        // max left 80%
        return <img id={"tree-" + id} style={{left: x + "%", top: y + "%"}} src="/tree_left.png" alt="tree"></img>
    }
    const makeRock = (id, x, y) => {
        // max top 80%
        // max right 68
        return <img id={"tree-" + id} style={{left: x + "%", top: y + "%"}} src="/rock_left.png" alt="tree"></img>
    }



    return ( 
        <div className="survival-left">
            <div className="left-container">
                { state.tree.lenght > 0 &&
                    state.tree.filter(el => el.place === "l").map(el => makeTree(el.id, el.place_x, el.place_y))
                }
                {
                    state.tree.lenght > 0 &&
                    state.tree.filter(el => el.place === "l").map(el => makeRock(el.id, el.place_x, el.place_y))
                }
            </div>
        </div>
    );
}
 
export default SurvivalGameLeft;