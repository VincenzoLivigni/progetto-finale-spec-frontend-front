export default function BoardGamesDetailCard({ boardGame, toggleFavorites, isFavorite }) {

    return (
        <div className="card_bg_detail mb-4">
            <h5><span className="fw-bold">Titolo:</span> {boardGame.title}</h5>
            <p><span className="fw-bold">Categoria:</span> {boardGame.category}</p>
            <p><span className="fw-bold">Brand:</span> {boardGame.brand}</p>
            <p><span className="fw-bold">Descrizione:</span> {boardGame.description}</p>
            <p><span className="fw-bold">Giocatori:</span> {boardGame.minPlayers} - {boardGame.maxPlayers}</p>
            <p><span className="fw-bold">Prezzo:</span> {boardGame.price}€</p>

            <button onClick={() => toggleFavorites(boardGame)}>
                {isFavorite ? "🧡" : "🤍"}
            </button>
        </div>
    )
}