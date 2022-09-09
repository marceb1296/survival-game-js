import "../css/survivalGameMenu.scss";

const SurvivalGameMenu = ({state, dispatch}) => {
	
	// probabilitys
	const probability_tree = [0, 0, 1, 0, 0, 2, 0, 0, 1, 0];
    const probability_rock = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1];
    
    // events
    const handleClickEn = async (e) => {
    	
    	e.preventDefault();
    	
    	dispatch({
    		type: "CLEAR ENV"
    	})
    	
    	await new Promise(r => setTimeout(r, 500));
    	
    	const tree = () => probability_tree[~~(Math.random() * probability_tree.length)];
    	const rock = () => probability_rock[~~(Math.random() * probability_rock.length)];
    	
    	if (tree > 0) {
    		for (let i = 0; i < tree; i++)
    		dispatch({
    			type: "SET TREE"
    		})
    	}
    	
    	if (rock > 0) {
    		for (let i = 0; i < rock; i++)
    		dispatch({
    			type: "SET ROCK"
    		})
    	}
    }
    
    
    return (
        <div className="survival-menu">
            <button onClick={handleClickEn}>Env</button>
        </div>
    )
}

export default SurvivalGameMenu;