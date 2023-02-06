import "../css/survivalGameNew_Over.scss";

const SurvivalGameOver = () => {
    
    const newGame = (e) => {
        localStorage.removeItem("survival_game");
        window.location.reload();
    }
    return (
        <div className="survival-game-over" style={{animation: "fadeIn 2s ease-in-out"}}>
            <label>Game over</label>
            <button onClick={newGame}>Nueva partida</button>
        </div>
    );
}

export default SurvivalGameOver;
