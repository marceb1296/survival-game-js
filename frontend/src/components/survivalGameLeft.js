import "../css/survivalGameLeft.scss";

const SurvivalGameLeft = () => {
    
    const getHeight = () => window.innerHeight

    const makeTree = () => {
        return <img style={{left: "80%", top: (getHeight() / 1.6) + "px"}} src="/tree.png" alt="tree"></img>
    }



    return ( 
        <div className="survival-left" style={{height: getHeight()}}>
            <div className="left-container">
                {
                    makeTree()
                }
            </div>
        </div>
    );
}
 
export default SurvivalGameLeft;