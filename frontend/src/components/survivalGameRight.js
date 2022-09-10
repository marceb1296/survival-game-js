import "../css/survivalGameRight.scss";

const SurvivalGameRight = ({state}) => {
    
    const getHeight = () => window.innerHeight

    const makeTree = (id, x, y) => <img id={"tree-" + id} style={{right: x + "%", top: y + "%"}} src="/tree_right.png" alt="tree"></img>
    
        // max top 80%
        // max right 68
    const makeRock = (id, x, y) => <img id={"tree-" + id} style={{right: x + "%", top: y + "%"}} src="/tree_right.png" alt="tree"></img>

    console.log(state.tree, state.tree.length)
    return ( 
        <div className="survival-left">
            <div className="left-container">
                { state.tree.length > 0 &&
                    state.tree.filter(el => el.place === "r").map(el => makeTree(el.id, el.pos_x, el.pos_y))
                }
                {
                    state.rock.length > 0 &&
                    state.rock.filter(el => el.place === "r").map(el => makeRock(el.id, el.pos_x, el.pos_y))
                }
            </div>
        </div>
    );
}
 
export default SurvivalGameRight;