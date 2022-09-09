import "../css/survivalGameRight.scss";

const SurvivalGameRight = () => {
    
    const getHeight = () => window.innerHeight

    const makeTree = () => {
        // max top 60%
        // max right 80%
        return <img style={{right: "80%", top: "60%"}} src="/tree_right.png" alt="tree"></img>
    }
    const makeRock = () => {
        // max top 80%
        // max right 68
        return <img style={{right: "68%", top: "80%"}} src="/rock_right.png" alt="tree"></img>
    }


    return ( 
        <div className="survival-right">
            <div className="right-container">
                {
                    makeTree()
                }
                {
                    makeRock()
                }
            </div>
        </div>
    );
}
 
export default SurvivalGameRight;