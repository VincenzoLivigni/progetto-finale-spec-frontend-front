import { Link } from "react-router-dom";

export default function BoardGamesCard({ bg, compareBoardGames, isCompared, toggleFavorites, isFavorite }) {

    return (
        <div className="card_list mb-4">
            <Link to={`/boardgames/${bg.id}`}>
                <h5><span className="fw-bold">Titolo:</span> {bg.title}</h5>
            </Link>
            <p><span className="fw-bold">Categoria:</span> {bg.category}</p>

            <button onClick={() => compareBoardGames(bg)}>
                {isCompared ? "Annulla confronto" : "Confronta"}
            </button>

            <button onClick={() => toggleFavorites(bg)}>
                {isFavorite ? "🧡" : "🤍"}
            </button>
        </div>
    )
}