export default function BoardGamesDetailCard({ boardGame, compareBoardGames, isCompared, toggleFavorites, isFavorite }) {

    return (
        <div className="card_bg_detail rounded-2 p-4 my-4">
            <h5><span className="fw-bold">Titolo:</span> {boardGame.title}</h5>
            <p><span className="fw-bold">Categoria:</span> {boardGame.category}</p>
            <p><span className="fw-bold">Brand:</span> {boardGame.brand}</p>
            <p><span className="fw-bold">Descrizione:</span> {boardGame.description}</p>
            <p><span className="fw-bold">Giocatori:</span> {boardGame.minPlayers} - {boardGame.maxPlayers}</p>
            <p><span className="fw-bold">Prezzo:</span> {boardGame.price}€</p>

            <button onClick={() => compareBoardGames(boardGame)} className="btn-compare me-3 px-2 rounded-2">
                {isCompared ? "Annulla confronto" : "Confronta"}
            </button>

            <button onClick={() => toggleFavorites(boardGame)} className="btn-favorite rounded-2">
                {isFavorite ? <i className="bi bi-heart-fill heart-active"></i> : <i className="bi bi-heart-fill heart-inactive"></i>}
            </button>
        </div>
    )
}