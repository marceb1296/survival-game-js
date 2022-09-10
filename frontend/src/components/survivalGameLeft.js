import "../css/survivalGameLeft.scss";

const SurvivalGameLeft = ({state}) => {
    
    const handleClickDel = (id) => {
    	alert(id)
    }

        // max top 60%
        // max left 80%
    const makeTree = (id, x, y) => <img onClick={() => handleClickDel(id)} id={"tree-" + id} style={{left: x + "%", top: y + "%"}} src="/tree_left.png" alt="tree"></img>
    
        // max top 80%
        // max right 68
    const makeRock = (id, x, y) => <img onClick={() => handleClickDel(id)} id={"tree-" + id} style={{left: x + "%", top: y + "%"}} src="/rock_left.png" alt="tree"></img>

    console.log(state.tree, state.tree.length)
    return ( 
        <div className="survival-left">
            <div className="left-container">
                { state.tree.length > 0 &&
                    state.tree.filter(el => el.place === "l").map(el => makeTree(el.id, el.pos_x, el.pos_y))
                }
                {
                    state.rock.length > 0 &&
                    state.rock.filter(el => el.place === "l").map(el => makeRock(el.id, el.pos_x, el.pos_y))
                }
            </div>
        </div>
    );
}
 
export default SurvivalGameLeft;