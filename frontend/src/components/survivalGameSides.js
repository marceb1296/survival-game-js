import "../css/survivalGameSides.scss";

const SurvivalGameSides = ({state, dispatch, side}) => {
    
    const handleClickDel = async (type, id) => {
    	document.getElementById(`${type}-${id}`).classList.toggle("fadeOut");
        await new Promise(r => setTimeout(r, 900));
        dispatch({
            type: `DEL ${type.toUpperCase()}`,
            payload: {
                id: id
            }
        })

        if (type === "tree") {
            dispatch({
                type: "ADD ITEM",
                payload: {
                    item: "wood",
                    amount: 3
                }
            })
        } else if (type === "rock") {
            dispatch({
                type: "ADD ITEM",
                payload: {
                    item: "stone",
                    amount: 2
                }
            })
        }
    }

        // max top 60%
        // max left 80%
    const makeTree = (id, x, y) => <img key={id} onClick={() => handleClickDel("tree", id)} id={"tree-" + id} style={{[side]: x + "%", top: y + "%"}} src={`/tree_${side}.png`} alt="tree"></img>
    
        // max top 80%
        // max right 68
    const makeRock = (id, x, y) => <img key={id} onClick={() => handleClickDel("rock", id)} id={"rock-" + id} style={{[side]: x + "%", top: y + "%"}} src={`/rock_${side}.png`} alt="tree"></img>

    return ( 
        <div className={`survival-${side}`}>
            <div className={`${side}-container`}>
                { state.tree.length > 0 &&
                    state.tree.filter(el => el.place === (side === "left" ? "l" : "r")).map(el => makeTree(el.id, el.pos_x, el.pos_y))
                }
                {
                    state.rock.length > 0 &&
                    state.rock.filter(el => el.place === (side === "left" ? "l" : "r")).map(el => makeRock(el.id, el.pos_x, el.pos_y))
                }
            </div>
        </div>
    );
}
 
export default SurvivalGameSides;