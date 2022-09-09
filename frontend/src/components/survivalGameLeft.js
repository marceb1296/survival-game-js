import "../css/survivalGameLeft.scss";

const SurvivalGameLeft = () => {
    
    const getHeight = () => window.innerHeight

    const makeTree = () => {
        // max top 60%
        // max left 80%
        return <img style={{left: "80%", top: "60%"}} src="/tree_left.png" alt="tree"></img>
    }
    const makeRock = () => {
        // max top 80%
        // max right 68
        return <img style={{left: "68%", top: "80%"}} src="/rock_left.png" alt="tree"></img>
    }



    return ( 
        <div className="survival-left">
            <div className="left-container">
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
 
export default SurvivalGameLeft;