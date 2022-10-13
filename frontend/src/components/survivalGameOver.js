import "../css/survivalGameOver.scss";

const SurvivalGameOver = () => {
    
    const newGame = (e) => {
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
